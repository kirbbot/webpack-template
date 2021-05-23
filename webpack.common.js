const path = require("path");

module.exports = {
    output: {
        assetModuleFilename: 'assets/[name][ext]'
    },
    entry: {
        main: "./src/index.js",
        vendor: "./src/vendor.js"
    },
    plugins: [],
    module: {
        rules: [{
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|jpg|jpeg|gif|png)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
        ]
    }
}