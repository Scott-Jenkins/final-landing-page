module.exports = {
    publicPath: '/final-landing-page/',
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://scottjenkinslandingpage.azurewebsites.net/',
                ws: true,
                changeOrigin: true
            },
        },
    },
    // server: {
    //     proxy: {
    //         '^/api': {
    //             target: 'https://scottjenkinslandingpage.azurewebsites.net/',
    //             ws: true,
    //             changeOrigin: true
    //         },
    //     },
    // }
  }
