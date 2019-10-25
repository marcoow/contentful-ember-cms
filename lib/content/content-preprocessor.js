'use strict';
const path = require('path');

const fs = require('fs-extra');
const contentful = require('contentful');
const BroccoliPlugin = require('broccoli-caching-writer');

module.exports = class ContentPreprocessor extends BroccoliPlugin {
  async build() {
    let client = contentful.createClient({
      space: 'yspq8i0i4kt2',
      accessToken: 'rSdaVg4gwpmY3mQfLGKQDNqipgRdDqNeFQ24vNGR4Ds'
    });
    
    let entries = await client.getEntries();

    let folderName = path.join(this.outputPath, 'content');
    fs.ensureDirSync(folderName);

    fs.writeFileSync(path.join(folderName, 'data.json'), JSON.stringify(entries));
  }
};
