const path = require('path')
module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@ui', path.resolve(__dirname, 'src/components/UI'))
  }
}
