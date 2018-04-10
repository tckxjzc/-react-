let path=require('path');
let config=require('./config');

let {dist,title,resourceOutput}=config;

let HtmlWebpackPlugins=require('html-webpack-plugin');

module.exports={
    entry:{
        'main':'../src/main.js'
    },
    output: {
        filename: resourceOutput + '/[name]_[chunkhash:8].js',
        chunkFilename: resourceOutput + '/chunk/[name]_[chunkhash:8].js',
        path:dist,
        publicPath: ''
    },
    resolve: {
        alias: {
            'bootstrap':path.join(__dirname, '../bootstrap'),
            'data': path.join(__dirname, '../src/data'),
            'library': path.join(__dirname, '../library'),
            'components': path.join(__dirname, '../src/components'),
            'lang': path.join(__dirname, '../src/lang'),
            'pages': path.join(__dirname, '../src/pages'),
            'assets':path.join(__dirname, '../src/assets'),
            'style':path.join(__dirname, '../src/style')
        },
        extensions: ['.js', '.jsx'],
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src'),
                    path.resolve(__dirname, '../library')
                ],
                exclude: [
                    path.resolve(__dirname, "../node_modules"),
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                query: {
                    limit: 5120,
                    outputPath:`${resourceOutput}/assets/`,
                }
            }
        ]
    }


};