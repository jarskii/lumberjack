var webpack = require('webpack');
var path = require('path');

var config = {
    entry: {
        app:[
            'webpack-dev-server/client?http://localhost:7778/',
            './public/js/app.js'
        ]
    },
    output: {
        filename: './dist/bundle.js',
        path: path.join(__dirname, 'assets'),
        publicPath: 'http://localhost:7777/assets'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?stage=0&optional=runtime'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};


module.exports = config;