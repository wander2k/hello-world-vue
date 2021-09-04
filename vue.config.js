  
const path = require('path');
const s = require('underscore.string');

const isCordovaMode = s.toBool(process.env.VUE_APP_CORDOVA_MODE);

let vueConfig = {
  publicPath: './',
  pluginOptions: {
    cordovaPath: 'cordova'
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    go : {
      // entry for the page
      entry: 'src/go.js',
      // the source template
      template: 'public/go.html',
      // output as dist/index.html
      filename: 'go.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'go Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'go']

    }    
  }  
  
}

if (isCordovaMode) {
  vueConfig = Object.assign({}, vueConfig,  {
      publicPath: '',
      outputDir: path.resolve(__dirname, './cordova/www'),
  });
}

module.exports = vueConfig;