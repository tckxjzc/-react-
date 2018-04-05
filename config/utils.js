
let path=require('path');
module.exports = {
   getScssLoader(modules = false,env=false) {
        let options = {
            minimize: env,
            modules: modules,
            localIdentName: '[local]_[hash:8]'
        };
        if (!modules) {
            options['root'] = path.resolve(__dirname, '../');
        }
        return [
            {
                loader: 'style-loader'
            },
            {
                loader: 'css-loader',
                options: options
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: (loader) => [
                        require('autoprefixer')(), //CSS浏览器兼容
                    ]
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    includePaths: []

                }
            },
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        '../library/style/web.tools.scss'
                    ]
                }
            }
        ]

    }

};