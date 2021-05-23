const path = require("path");
var HTMLWebpackPlugin = require('html-webpack-plugin')
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    optimization: {
        minimizer: [
            new CSSMinimizerPlugin(),
            new TerserPlugin(),
            new HTMLWebpackPlugin({
                template: "./src/index-template.html",
                inject: "body",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ],
    },
})