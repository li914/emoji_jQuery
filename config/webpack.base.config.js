/**
 * webpack4基础配置文件
 * */
const path=require('path');
const Webpack=require('webpack');

function resolve(dir){
    return path.join(__dirname,'..',dir);
}

module.exports={
    resolve: {
        extensions: [
            '.js','.css','.json','.xml'
        ],
        alias:{
            '@':resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test:/\.(css|less|scss)$/,
                use:[
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"},
                    {loader: "sass-loader"}
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test:/\.(htm|html)$/,
                use:'html-withimg-loader'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }
        ]
    },
    externals:{
        'jquery':"jQuery"
    }
};