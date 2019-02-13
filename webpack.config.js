const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    entry: ['@babel/polyfill', './playground/index.js'],
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}

module.exports = config;