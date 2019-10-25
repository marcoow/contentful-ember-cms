'use strict';
const path = require('path');

const fs = require('fs-extra');
const contentful = require('contentful');
const BroccoliPlugin = require('broccoli-plugin');

module.exports = class ContentPreprocessor extends BroccoliPlugin {
  constructor(inputNodes, options) {
    super(inputNodes, {
      ...options,
      persistentOutput: true
    });

    this._changed = true;

    this._liveContent = options.liveContent;
    this._isInitialDataSync = true;
    this._nextSyncToken = null;
    this._sourceContent = {
      entries: [],
      assets: []
    }

    this.contentfulClient = contentful.createClient({
      space: '…',
      accessToken: '…'
    });
  }

  async build() {
    if (this._hasChanged()) {
      let [entries, assets] = await this._loadLatestContent();

      // test data
      // let entries = [
      //   { fields: { title: { 'en-US': 'Hello!' } } },
      //   { fields: { title: { 'en-US': 'What? 🙀' } } }
      // ];
      // let assets = [];

      this._sourceContent = {
        entries,
        assets
      }

      let transformedEntries = this._transformEntries(this._sourceContent.entries);
      let transformedAssets = this._transformAssets(this._sourceContent.assets);

      this._writeTransformedData(transformedEntries, transformedAssets);

      this._changed = false;
    }
  }

  _hasChanged() {
    return this._changed || this._liveContent;
  }

  _writeTransformedData(entries, assets) {
    let folderName = path.join(this.outputPath, 'content');
    fs.ensureDirSync(folderName);

    fs.writeFileSync(path.join(folderName, 'entries.json'), JSON.stringify(entries, null, 2));
    fs.writeFileSync(path.join(folderName, 'assets.json'), JSON.stringify(assets, null, 2));
  }

  async _loadLatestContent() {
    let response = await this.contentfulClient.sync({
      initial: this._isInitialDataSync,
      nextSyncToken: this._nextSyncToken
    },
    {
      paginate: false
    });

    this._nextSyncToken = response.nextSyncToken;

    let entries, assets;
    if (this._isInitialDataSync) {
      entries = response.entries;
      assets = response.assets;
    } else {
      entries = this._updateSourceData(this._sourceContent.entries, response.entries, response.deletedEntries);
      assets = this._updateSourceData(this._sourceContent.assets, response.assets, response.deletedAssets);
    }

    this._isInitialDataSync = false;

    return [entries, assets];
  }

  _transformEntries(entries) {
    return entries;
  }

  _transformAssets(assets) {
    return assets;
  }

  _updateSourceData(previousElements, changedElements, deletedElements) {
    let elements = previousElements.filter((element) => {
      let changedOrDeleted = [
        ...changedElements,
        ...deletedElements
      ].some((e) => e.sys.id === element.sys.id);

      return !changedOrDeleted;
    });
    elements = elements.concat(changedElements);

    return elements;
  }
};
