'use strict';
const ContentPreprocessor = require('./content-preprocessor');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    let contentTree = new ContentPreprocessor([], {
      liveContent: Boolean(process.env.LIVE_CONTENT)
    });

    return contentTree;
  }
};
