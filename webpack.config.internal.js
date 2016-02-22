var webpack = require('webpack');

module.exports = {
    entry: {
        app: './view/script/internal/main.js'
    },
    output: {
        filename: './asset/js/bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: { comments: false }
    })]
};
