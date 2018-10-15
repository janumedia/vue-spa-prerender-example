module.exports = {
    productionSourceMap: false,
    //Invalid Host Header issue
    //https://github.com/vuejs-templates/webpack/issues/1205#issuecomment-404321666
    devServer: {
        disableHostCheck: true
    }
}