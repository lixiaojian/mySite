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

module.exports = [{
    name: "browser",
    context: path.join(__dirname),
    entry:{
        resume1:[
            './src/pc/resume1/scripts/index.js'
        ],
        resume2:[
            './src/pc/resume2/scripts/index.js'
        ],
        index:[
            './src/pc/index/scripts/index.js'
        ],
        mIndex:[
            './src/mobile/index/scripts/index.js'
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
        new webpack.optimize.ModuleConcatenationPlugin(),
        //把通过npm包引用的第三方类库从入口文件中提取出来
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 3
        }),
        new webpack.optimize.UglifyJsPlugin({//混合代码插件
            compressor: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['build'],
            {
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
                loaders: ['url-loader?limit=4096&name=images/[hash].[ext]',{
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
    }
}
,
{
    name: "server",
    context: path.join(__dirname),
    entry:{
        index:[
            './server/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build/'),
        publicPath:'/build/',
        filename: 'js/page/[name].page.js',
        library: 'page',
        libraryTarget: 'commonjs'
    },
    plugins: [
        //根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
        new webpack.optimize.OccurrenceOrderPlugin(),
        //定义变量，一般用于开发环境log或者全局变量
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            '_isServerDev_':true
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [path.join(__dirname, 'src'),path.join(__dirname, 'server')]
            },
            { test: /\.css$/, use: ["css-loader"]},
            {
                test: /\.less$/,
                use: [
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(woff|svg|eot|ttf)$/,
                use:[{
                    loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png)$/i,
                loaders: ['url-loader?limit=4096&name=images/[hash].[ext]',{
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
                include: path.join(__dirname, 'src'),
            },

            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.css']
    }
}];