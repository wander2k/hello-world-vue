  
const path = require('path');
const s = require('underscore.string');

const isCordovaMode = s.toBool(process.env.VUE_APP_CORDOVA_MODE);

let vueConfig = {
  publicPath: '',
  pluginOptions: {
    cordovaPath: 'cordova'
  }
}

if (isCordovaMode) {
  vueConfig = Object.assign({}, vueConfig,  {
      publicPath: '',
      outputDir: path.resolve(__dirname, './cordova/www'),
  });
}

module.exports = vueConfig;