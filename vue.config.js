const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/_variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.31.21:19000',  // 后台接口地址
        ws: true,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite:{    // 重写路径
          '^/api':''
        }
      }
    }
  },
  parallel: false,
  chainWebpack: (config) => {
    config.module.rule('md')
        .test(/\.md/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-markdown-loader')
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options({
          raw: true
        })
  }
})
