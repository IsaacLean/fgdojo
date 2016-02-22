var gulp = require('gulp');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var wpStream = require('webpack-stream');
var webpack = require('webpack');

var PATH = {
    root: './',
    templateWatch: './view/template/*.html',
    templateDest: './view/template-min',
    cssWatch: './view/style/**/*.css',
    sassWatch: './view/style/**/*.scss',
    sassDest: './asset/css',
    jsExternal: './view/script/external/**/*.js',
    jsInternal: './view/script/internal/**/*.js',
    wpInternal: './webpack.config.internal.js',
    wpExternal: './webpack.config.external.js',
    imgWatch: './view/img/*',
    imgDest: './asset/img',
    bootstrapCss: './node_modules/bootstrap/dist/css/bootstrap.css'
};

var wpInternal = {
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

var uglify = [new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    output: { comments: false }
})];


/*
 * [ gulp ]
 * Run templates, styles, scripts-external, scripts-internal,
 * & image tasks once then watch
 */
gulp.task('default', [
    'templates',
    'styles',
    'scripts-external',
    'scripts-internal',
    'images',
    'watch'
]);


/*
 * [ gulp templates ]
 * Minifies templates' HTML
 */
gulp.task('templates', function() {
    return gulp.src(PATH.templateWatch)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(PATH.templateDest));
});


/*
 * [ gulp styles ]
 * Compile Sass into CSS, auto-prefix it & inject into browser
 * --min: Minfies CSS
 */
gulp.task('styles', function() {
    var data = gulp.src([PATH.bootstrapCss, PATH.sassWatch])
        .pipe(concat('style.css'));

    if(argv.min === undefined) {
        data = data.pipe(sass());
    } else {
        data = data.pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({extname: '.min.css'}));
    }

    return data.pipe(autoprefixer({browser: ['last 2 versions']}))
        .pipe(gulp.dest(PATH.sassDest))
        .pipe(browserSync.stream());
});


/* 
 * [ gulp scripts-external ]
 * Run ESLint and compile external JS with webpack
 * --nolint: Skips ESLint
 * --min: Uglifies JS
 */
gulp.task('scripts-external', function() {
    // TODO: get sourcemaps working with webpack
    var data = gulp.src(PATH.jsExternal);

    if(argv.nolint === undefined) {
        data = data.pipe(eslint())
            .pipe(eslint.format());
    }
        
    data = data.pipe(wpStream(require(PATH.wpExternal)));

    if(argv.min !== undefined) {
        data = data.pipe(uglify())
            .pipe(rename({extname: '.min.js'}));
    }

    return data.pipe(gulp.dest(PATH.root));
});


/* 
 * [ gulp scripts-internal ]
 * Run ESLint and compile internal JS with webpack
 * --nolint: Skips ESLint
 * --min: Uglifies JS
 */
gulp.task('scripts-internal', function() {
    // TODO: get sourcemaps working with webpack
    var data = gulp.src(PATH.jsInternal);

    if(argv.nolint === undefined) {
        data = data.pipe(eslint())
            .pipe(eslint.format());
    }

    if(argv.min !== undefined) {
        wpInternal.plugins = uglify;
        wpInternal.output.filename = './asset/js/bundle.min.js';
        wpInternal.devtool = 'source-map';
    }

    return data.pipe(wpStream(wpInternal))
        .pipe(gulp.dest(PATH.root));
});


/*
 * [ gulp images ]
 * Compress JPEG & PNG images
 */
gulp.task('images', function() {
    return gulp.src(PATH.imgWatch)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(PATH.imgDest));
});


// Used for 'gulp watch'.
// Triggers BrowserSync reload after 'gulp scripts-external' completes during 'gulp watch'.
gulp.task('scripts-external-watch', ['scripts-external'], function() {
    browserSync.reload();
});

// Triggers BrowserSync reload after 'gulp scripts-internal' completes during 'gulp watch'.
gulp.task('scripts-internal-watch', ['scripts-internal'], function() {
    browserSync.reload();
});

/*
 * [ gulp watch ]
 * Watch any changes in templates, Sass, JS & images and run their respective tasks
 * when changes occur
 */
gulp.task('watch', function() {
    browserSync.init({
        port: 9002,
        proxy: 'localhost:9001'
    });

    gulp.watch(PATH.templateWatch).on('change', browserSync.reload);
    gulp.watch(PATH.sassWatch, ['styles']);
    gulp.watch(PATH.jsExternal, ['scripts-external-watch']);
    gulp.watch(PATH.jsInternal, ['scripts-internal-watch']);
    gulp.watch(PATH.imgWatch, ['images']).on('change', browserSync.reload);
});


// Used for 'gulp build'.
gulp.task('styles-prod', function() {
    return gulp.src([PATH.cssWatch, PATH.sassWatch])
        .pipe(concat('style.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({extname: '.min.css'}))
        .pipe(autoprefixer({browser: ['last 2 versions']}))
        .pipe(gulp.dest(PATH.sassDest));
});

gulp.task('scripts-external-prod', function() {
    return gulp.src(PATH.jsExternal)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(wpStream(require(PATH.wpExternal)))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(PATH.root));
});

gulp.task('scripts-internal-prod', function() {
    return gulp.src(PATH.jsInternal)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(wpStream(require(PATH.wpInternal)))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(PATH.root));
});

/* 
 * [ gulp build ]
 * Create most optimized build for production
 */
gulp.task('build',  [
    'templates',
    'styles-prod',
    'scripts-external-prod',
    'scripts-internal-prod',
    'images'
]);
