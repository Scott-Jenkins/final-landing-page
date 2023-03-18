module.exports = {
    publicPath: '/landing-page/',
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://scottjenkinslandingpage.azurewebsites.net/',
                ws: true,
                changeOrigin: true
            },
        },
      }
  }