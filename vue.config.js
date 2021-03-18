const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        assets: path.resolve(__dirname, 'src/assets/'),
        common: path.resolve(__dirname, 'src/common/'),
        components: path.resolve(__dirname, 'src/components/'),
        network: path.resolve(__dirname, 'src/network/'),
        views: path.resolve(__dirname, 'src/views/'),
      }
    }
  }
}