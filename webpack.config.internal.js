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
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
