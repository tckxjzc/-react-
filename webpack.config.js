let merge=require('webpack-merge');
let HtmlWebpackPlugins=require('html-webpack-plugin');

let baseConfig=require('./config/webpack.base');
let config=require('./config/config');
let {dist,title,resourceOutput}=config;
let utils=require('./config/utils');
module.exports=merge(baseConfig,{
    mode:'development',
    module: {
        rules:[
            {
                test: /(.scope.(scss|css))$/,
                use: utils.getScssLoader(true)
            },
            {
                test:(name)=> {
                    if (name.indexOf('scope')>-1) {
                        return false;
                    }
                    return name.endsWith('.scss')||name.endsWith('.css');
                }
                ,
                use:utils.getScssLoader(false)
            }
        ],
    },

    plugins:[
        new HtmlWebpackPlugins({
            title:title,
            template: '../src/index.html',
            filename:`${dist}/index.html`,
        })
    ]
});