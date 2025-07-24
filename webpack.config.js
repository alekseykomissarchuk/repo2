
'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports={
    entry: "./src/index.js",
    output: 
    {
    filename:"bundle.[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    },

    optimization: {minimize: true, minimizer: [  new TerserPlugin(), new CssMinimizerPlugin()],},

    devServer:
    {
        static:{directory:path.resolve(__dirname, 'dist'),watch: true},
        port:3000,open: true,hot: true,compress: true
    },


    module:
    {
    rules:
    [
        {
            test:/\.(scss|css)$/,
            use:['style-loader','css-loader',{loader: 'postcss-loader',options:{postcssOptions:{plugins:[['autoprefixer', {}],],}, },},'sass-loader'],
        },

        {
            test:/\.(png|jpe?g|gif|svg|webp)$/i,
            type:'asset/resource',
            generator:{filename: 'images/[name][hash][ext]'},
        },

        {
            test:/\.(mp4|webm|ogg)$/i,
            type:'asset/resource',
            generator:{filename: 'videos/[name][hash][ext]'}
        }
    ],
    },

    plugins:
    [
    new HtmlWebpackPlugin({template:"./src/index.html",meta:{viewport:"width=device-width initial-scale=1",keywords:"webpack,bootstrap"},},),
    new CopyWebpackPlugin({patterns:[{ from: 'src/assets', to: 'assets' }]})
    ]



}