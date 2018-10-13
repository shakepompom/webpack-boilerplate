const { join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const rootDir = join(__dirname, './');

let pathsToClean = [
    '*.html',
    'static/css/*.*',
    'static/js/*.*',
    'static/svg/*.*'
]
let cleanOptions = {
    root: join(rootDir, './public'),
    verbose: true,
    dry: false
}

module.exports = {
    entry: {
        index: join(rootDir, './assets/js/pages/index'),
        second: join(rootDir, './assets/js/pages/second'),
    },
    output: {
        path: join(rootDir, './public'),
        publicPath: '/',
        filename: './static/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new ExtractTextPlugin({
            filename: './static/css/[name].css'
        }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new NunjucksWebpackPlugin({
            templates: [
                {
                    from: "./assets/templates/index.njk",
                    to: "./index.html"
                },
                {
                    from: "./assets/templates/second.njk",
                    to: "./second.html"
                }
            ]
        }),
        new SvgStore({
            svgoOptions: {
                plugins: [
                    {
                        removeTitle: true,
                        removeComments: true,
                        removeUselessStrokeAndFill: true,
                    }
                ]
            },
            prefix: 'icon-'
        })
    ],
    devtool: NODE_ENV === 'development' ? 'eval' : null,
    devServer: {
        clientLogLevel: 'none',
        watchOptions: {
            poll: true
        },
        contentBase: join(rootDir, './public'),
        watchContentBase: true
    }
};