const PrerenderSPAPlugin = require('prerender-spa-plugin');
let path = require('path');
module.exports = {
    configureWebpack: config => {
        //if(process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: ['/', '/tiles-grid', '/chess-grid', '/list-box', '/google', '/404'],
                    renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
                        renderAfterTime: 5000
                    })
                })
            ]
        }
    },
    productionSourceMap: false,
    //Invalid Host Header issue
    //https://github.com/vuejs-templates/webpack/issues/1205#issuecomment-404321666
    devServer: {
        disableHostCheck: true
    }
}