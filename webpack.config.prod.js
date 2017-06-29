/**
 * Created by xiaojianli on 2017/3/6.
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const fs = require('fs');
const existsSync = fs.existsSync;

const pkgPath = path.join(__dirname, 'package.json');
const pkg = existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    if (cfgPath.charAt(0) === '.') {
        cfgPath = path.resolve(__dirname, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}

module.exports = {
    entry:{
        resume1:[
            './src/resume1/scripts/index.js'
        ],
        resume2:[
            './src/resume2/scripts/index.js'
        ],
        index:[
            './src/index/scripts/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build/'),
        publicPath:'/build/',
        filename: 'js/[name].js'
    },
    plugins: [
        //根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        new webpack.optimize.OccurrenceOrderPlugin(),
        //定义变量，一般用于开发环境log或者全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // 把通过npm包引用的第三方类库从入口文件中提取出来
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: function (module, count) {
        //         // 指定范围是js文件来自node_modules
        //         return (module.resource && /\.js$/.test(module.resource) &&module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0);
        //     }
        // }),
        // // 把webpack的module管理相关基础代码从vendor中提取到manifest
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     chunks: ['vendor']
        // }),
        new webpack.optimize.UglifyJsPlugin({//混合代码插件
            compressor: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['build'],
            {
                // root:'/full/project/path',
                verbose: true,
                dry: false
            }
        ),
        //css单独打包
        new ExtractTextPlugin("css/[name].css"),
        //css压缩
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: false
        })
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            { test: /\.css$/, use: ["style-loader","css-loader"]},
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract([
                    'css-loader',
                    'postcss-loader',
                    { loader:'less-loader', options: {"sourceMap":false,"modifyVars":theme}}
                ])
            },
            {
                test:/\.(woff|svg|eot|ttf)$/,
                use:[{
                    loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png)$/i,
                loaders: ['url-loader?limit=8192&name=images/[hash].[ext]',{
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '60-80',
                                speed: 3,
                            }
                        }
                    }
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },

            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.css']
        // alias: {
        //     'jquery': path.resolve(__dirname, 'vendor/jquery/jquery-1.11.3.min.js')
        // }
    }
};