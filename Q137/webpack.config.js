/**
 * Created by YH on 2017/1/9.
 */
require("babel-polyfill");
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
    entry: {
        // vendor: ['react', 'react-dom', 'react-router'],
        app: ["babel-polyfill", __dirname + '/app/entry/app.js'],
        assistantSup: ["babel-polyfill", __dirname + '/app/entry/assistantSup.js'],
        classAdviser: ["babel-polyfill", __dirname + '/app/entry/classAdviser.js'],
        majorMaster: ["babel-polyfill", __dirname + '/app/entry/majorMaster.js'],
        headMaster: ["babel-polyfill", __dirname + '/app/entry/headMaster.js']
    },
    output: {
        path: path.join(__dirname, './build/'),
        filename: '[name].js',
        publicPath: '/',
        // 添加 chunkFilename
        chunkFilename: 'js/[name].js',
    },
    devServer: {
        contentBase: __dirname + '/build',
        port: 5000,
        host: 'localhost',
        inline: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.js|jsx$/,
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                include: path.join(__dirname, 'js')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192?&name=img/[name].[ext]' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
            },
            {
                test: /\.css$/,
                // loader: 'style!css'
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file?name=./static/fonts/[name].[ext]',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                // include: APP_PATH,
                exclude: /node_modules/,
                query: {
                    plugins: [["import", { libraryName: "antd", style: "css" }]],// `style: true` 会加载 less 文件
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /\.json/,
                loader: 'json-loader'
            },
        ]

    },
    plugins: [
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        new HtmlWebpackPlugin({
            chunks: ["app"],
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ["assistantSup"],
            filename: 'assistantSup.html',
            template: 'assistantSup.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ["classAdviser"],
            filename: 'classAdviser.html',
            template: 'classAdviser.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ["majorMaster"],
            filename: 'majorMaster.html',
            template: 'majorMaster.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ["headMaster"],
            filename: 'headMaster.html',
            template: 'headMaster.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        // }),
    ]
};
