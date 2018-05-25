const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/'
    },
    devtool: 'source-map', //'inline-source-map',
    plugins: [
        //new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MergeIntoSingleFilePlugin({
            files: {
                "dist/css/app.css": [
                    'dist/css/style.css',
                    'dist/css/fix.css',
                    'dist/css/leather.css',
                    'dist/css/sticky-header.css',
                    'dist/css/cb-slideshow.css',
                    'dist/css/style-new.css',
                    'dist/css/GridGallery.css',
                    'dist/css/backgroundSlider.css'
                ]
            }
        })
    ],
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'es2015', 'stage-2']
                }
            }
        },
        {
            test: /\.png$/,
            loader: 'url-loader?limit=100000&minetype=image/png'
        },
        {
            test: /\.jpg/,
            loader: 'file-loader'
        },
        { 
            test: /\.svg$/, 
            loader: 'raw-loader' 
       }]
    }
};

