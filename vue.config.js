const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 文件资源路径
  publicPath: '/qianfang',
  // 方向代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.97.33.178',
        changeOrigin: true
      }
    }
  }
})
