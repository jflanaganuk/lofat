const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    entry: './src/app.tsx',
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    publicPath: (_url, resourcePath, context) => {
                        return path.relative(context, resourcePath);
                    }
                }
            },
            {
                test: /\.svg$/,
                loader: '@svgr/webpack'
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    mode: 'development',
}