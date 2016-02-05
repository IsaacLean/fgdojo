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
// var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');


var PATH = {
    root: './',
    templateWatch: './view/templates/*.html',
    templateDest: './view/templates-min',
    cssWatch: './view/styles/**/*.css',
    sassWatch: './view/styles/**/*.scss',
    sassDest: './asset/css',
    jsWatch: './view/scripts/**/*.js',
    jsDest: './asset/js',
    imgWatch: './view/img/*',
    imgDest: './asset/img',
    bootstrapCss: './node_modules/bootstrap/dist/css/bootstrap.css'
};


/*
 * [ gulp ]
 * Run templates, styles, scripts & image tasks once then watch
 */
gulp.task('default', ['templates', 'styles', 'scripts', 'images', 'watch']);


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
 * [ gulp scripts ]
 * Run ESLint and compile JS with webpack
 * --nolint: Skips ESLint
 * --min: Uglifies JS
 */
gulp.task('scripts', function() {
    // TODO: get sourcemaps working with webpack
    var data = gulp.src(PATH.jsWatch);

    if(argv.nolint === undefined) {
        data = data.pipe(eslint())
            .pipe(eslint.format());
    }
        
    data = data.pipe(webpack(require('./webpack.config.js')));

    if(argv.min !== undefined) {
        data = data.pipe(uglify())
            .pipe(rename({extname: '.min.js'}));
    }

    return data.pipe(gulp.dest(PATH.root));
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
// Triggers BrowserSync reload after 'gulp scripts' completes during 'gulp watch'.
gulp.task('scripts-watch', ['scripts'], function() {
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
    gulp.watch(PATH.jsWatch, ['scripts-watch']);
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

gulp.task('scripts-prod', function() {
    return gulp.src(PATH.jsWatch)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(PATH.root));
});

/* 
 * [ gulp build ]
 * Create most optimized build for production
 */
gulp.task('build',  ['templates', 'styles-prod', 'scripts-prod', 'images']);
