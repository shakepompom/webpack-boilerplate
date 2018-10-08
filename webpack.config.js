const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');

const rootDir = join(__dirname, './');

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
        new ExtractTextPlugin({
            filename: './static/css/[name].css'
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
    devServer: {
        clientLogLevel: 'none',
        watchOptions: {
            poll: true
        },
        contentBase: join(rootDir, './public'),
        watchContentBase: true
    }
};