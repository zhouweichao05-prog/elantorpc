const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 9090,
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  }
})
