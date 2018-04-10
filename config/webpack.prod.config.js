let merge=require('webpack-merge');
let HtmlWebpackPlugins=require('html-webpack-plugin');
let config=require('./config');
let {dist,title,resourceOutput}=config;
let baseConfig=require('./webpack.base');
let utils=require('./utils');
let webpack=require('webpack');
module.exports=merge(baseConfig,{
    mode:'production',
    externals:{
        'react':'React',
        'react-dom': 'ReactDOM',
        'react-router-dom':'ReactRouterDOM',
        'swiper':'Swiper'
    },
    module:{
        rules:[
            {
                test: /(.scope.(scss|css))$/,
                use: utils.getScssLoader(true,true)
            },
            {
                test:(name)=> {
                    if (name.indexOf('scope')>-1) {
                        return false;
                    }
                    return name.endsWith('.scss')||name.endsWith('.css');
                }
                ,
                use:utils.getScssLoader(false,true)
            }
        ],
    },
    plugins:[
        new HtmlWebpackPlugins({
            title:title,
            template: '../src/index.html',
            library:[
                'https://cdn.bootcss.com/react/16.3.1/umd/react.production.min.js',
                'https://cdn.bootcss.com/react-dom/16.3.1/umd/react-dom.production.min.js'
            ],
            filename:`${dist}/index.html`,
        }),
        new webpack.DefinePlugin({
            "wbp.target":"'_self'"
        })
    ]

});