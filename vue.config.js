// Axios跨域代理配置
module.exports = {
  // 公共路径(必须有的)
  publicPath: "./",
  /*   // 输出文件目录
    outputDir: "dist",
    // 静态资源存放的文件夹(相对于ouputDir)
    assetsDir: "assets", */
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  devServer: {
    proxy: {
      "/api": {
        // 使用"/api"来代替"http://f.apiplus.c"
        target: 'http://127.0.0.1:8080', // 源地址
        // target: "http://192.168.0.105:8080", // 源地址
        changeOrigin: true, // 改变源
        pathRewrite: {
          "^/api": "", // 路径重写
        },
      },
      "/upload": {
        target: 'http://127.0.0.1:8080', // 源地址
        // target: "http://192.168.0.105:8080", // 源地址
        changeOrigin: true, // 改变源
        /* pathRewrite: {
          "^/upload": "/upload", // 路径重写
        }, */
      },
    }
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       'assets': '@/assets',
  //       'components': '@/components',
  //       'plugins': '@/plugins',
  //       'router': '@/router',
  //       'styles': '@/styles'
  //     }
  //   }
  // }
}