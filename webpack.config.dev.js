const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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

module.exports =[
    //浏览器端代码
    {
        name: "browser",
        context: path.join(__dirname),
        devtool:'cheap-module-eval-source-map',
        entry:{
            index:[
                './src/index/scripts/index.js',
            ]
        },
        output:{
            filename:'[name].js',
            publicPath:'/build/js/',
            path: __dirname + '/build/js/'
        },
        module:{
            rules:[
                {
                    test:/\.jsx?$/,
                    include:[
                        path.resolve(__dirname,'src')
                    ],
                    use:['react-hot-loader','babel-loader']
                },
                {
                    test:/\.css$/,
                    use:[
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ]
                },
                {
                    test:/\.(woff|svg|eot|ttf)$/,
                    use:[{
                        loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
                    }]

                },
                {
                    test: /\.less/,
                    use: [
                        'style-loader',
                        { loader:'css-loader', options: {"sourceMap":true}},
                        'postcss-loader',
                        { loader:'less-loader', options: {"sourceMap":true,"modifyVars":theme}}
                    ]
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [
                        {loader:'url-loader',options:{limit:8192,name:'images/[hash].[ext]'}}
                    ]
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                }
            ]
        },
        resolve:{
            extensions:['.js','.jsx','.css']
        },
        plugins:[
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':JSON.stringify('development')
            }),
            //遇到编译错误不停止服务
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: 3
            }),
            //css单独打包
            new ExtractTextPlugin('')
        ]
    },
    //服务端代码
    {
        name: "server",
        context: path.join(__dirname),
        entry:{
            index:[
                './server/index.js'
            ]
        },
        output:{
            filename:'[name].page.js',
            publicPath:'/server/',
            path: __dirname + '/server/',
            library: 'page',
            libraryTarget: 'commonjs'
        },
        module:{
            rules:[
                {
                    test:/\.jsx?$/,
                    include:[
                        path.resolve(__dirname,'src'),
                        path.resolve(__dirname,'server')
                    ],
                    use:['babel-loader']
                },
                {
                    test:/\.css$/,
                    use:[
                        'css-loader'
                    ]
                },
                {
                    test:/\.(woff|svg|eot|ttf)$/,
                    use:[{
                        loader:'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
                    }]

                },
                {
                    test: /\.less/,
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [
                        {loader:'url-loader',options:{limit:8192,name:'images/[hash].[ext]'}}
                    ]
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                }
            ]
        },
        resolve:{
            extensions:['.js','.jsx','.css']
        },
        plugins:[
            new webpack.DefinePlugin({
                'process.env.NODE_ENV':JSON.stringify('development'),
                '_isServerDev_':true
            }),
            //遇到编译错误不停止服务
            new webpack.NoEmitOnErrorsPlugin(),
            //css单独打包
            new ExtractTextPlugin('')
        ]
    }
]