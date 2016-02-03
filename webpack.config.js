module.exports = {
    entry: {
        app: './view/js/script.js'
    },
    output: {
        filename: './static/js/bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
