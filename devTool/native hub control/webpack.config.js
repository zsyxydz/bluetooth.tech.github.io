var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js', ['vendor']);

module.exports = {
        entry: {
            index: './index.js',
            vendor: ['jquery']
        },
        output: {
            path: __dirname + '/dist',
            filename: "[name].js",
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: 'style!css?modules!postcss'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            }]
        },
        postcss: [
            require('autoprefixer') //调用autoprefixer插件
        ],
        plugins: [commonsPlugin,
            new webpack.ProvidePlugin({
                $: 'jquery'
            })
        ]
}



        // // 判断生产&&测试环境
        // var isProduction = function () {
        //     return process.env.NODE_ENV === 'production';
        // };

        // // 判断开发(热加载)环境
        // var isHot = function () {
        //     return process.env.NODE_ENV === 'hotdev';
        // };

        // // 不同环境输出到不同文件夹
        // var sEnvironment = function () {
        //     switch (process.env.NODE_ENV) {
        //         case 'hotdev':
        //             return '/hot/';
        //         case 'production':
        //             return '/dist/';
        //         default:
        //             return '/dev/';
        //     }
        // };

        // // 运行终端: 'mobile/'表示微信端;'basic/'表示PC端
        // // 项目原因有两套配置文件
        // var sSystem = 'basic/';

