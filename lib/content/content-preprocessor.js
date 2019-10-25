'use strict';
const path = require('path');

const fs = require('fs-extra');
const contentful = require('contentful');
const BroccoliPlugin = require('broccoli-plugin');

module.exports = class ContentPreprocessor extends BroccoliPlugin {
  constructor(inputNodes, options) {
    super(inputNodes, options);

    this._changed = true;
    this._liveContent = options.liveContent;
  }

  async build() {
    if (this._hasChanged()) {
      //let client = contentful.createClient({
      //  space: '…',
      //  accessToken: '…'
      //});
      //
      //let entries = await client.getEntries();
      let entries = [{
        title: 'Hello!',
        body: 'This is an article!'
      },{
        title: 'what?',
        body: 'another article, omg!'
      }]

      let folderName = path.join(this.outputPath, 'content');
      fs.ensureDirSync(folderName);

      fs.writeFileSync(path.join(folderName, 'data.json'), JSON.stringify(entries));

      this._changed = false;
    }
  }

  _hasChanged() {
    return this._changed || this._liveContent;
  }
};
