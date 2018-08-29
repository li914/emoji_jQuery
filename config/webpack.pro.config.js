/**
 * 生产环境时,webpack4配置文件,
 * 不分离css文件
 * */
const path=require('path');
const Webpack=require('webpack');
//合并配置文件插件
const Merge=require('webpack-merge');
/**
 * 基础配置文件
 * */
const BaseWebpackConfig=require('./webpack.base.config.js');

const CLeanWebpackPlugin=require('clean-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports=Merge(BaseWebpackConfig,{
    mode:"production",
    entry:path.resolve(__dirname,'../src'),
    output:{
        filename:"[name].min.js",
        path: path.resolve(__dirname,'../dist')
    },
    plugins:[
        new CLeanWebpackPlugin(path.resolve(__dirname,'../dist'),{
            root:path.resolve(__dirname,'../'),
            verbose:true
        }),
        new UglifyJsPlugin({
            parallel:4,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false
                },
            },
            cache: true,
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
});