
let port=8070;
let webpack = require('webpack');
let path=require('path');
let webpackConfig = require('../webpack.config');
webpackConfig.entry.app=webpackConfig.entry.app||[];
webpackConfig.entry.app.unshift("webpack-dev-server/client?http://localhost/");
let compiler = webpack(webpackConfig);
let WebpackDevServer = require("webpack-dev-server");
let server=new  WebpackDevServer(compiler,{
    contentBase:path.join(__dirname,'../dist'),
    host:'0.0.0.0',
    port:port,
    disableHostCheck: true,
    proxy: {
        '/api': {
            // target: 'http://47.88.139.67:7000',
            // target: {
            //     "host": "mall.tokovips.id",
            //     "protocol": 'https:',
            //     "port": 80
            // },
            changeOrigin: true,
            secure: false
        },
        '/':{
            // target:'http://localhost',
            bypass: function(req, res, proxyOptions) {
                if (req.headers.accept&&req.headers.accept.indexOf('html') !== -1) {
                    return '/index.html';
                }

            }
        }
    }

});

let ip=require('../config/get-ip')();

server.listen(port,'',()=>{
    console.log(`http://${ip}:${port}`);
    require('opn')(`http://${ip}:${port}`);
});