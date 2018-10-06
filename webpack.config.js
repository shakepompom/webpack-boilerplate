const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');

const rootDir = join(__dirname, './');

module.exports = {
    entry: {
        index: join(rootDir, './assets/js/pages/index'),
        second: join(rootDir, './assets/js/pages/second'),
    },
    output: {
        path: join(rootDir, './public'),
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
                    to: "./html/index.html"
                },
                {
                    from: "./assets/templates/second.njk",
                    to: "./html/second.html"
                }
            ]
        }),
    ]
};