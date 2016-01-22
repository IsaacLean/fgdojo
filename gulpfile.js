/*eslint-env node*/

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var TEMPLATE_SRC = './view/templates/*.html';
var TEMPLATE_DEST = './view/templates-min';
var SASS_SRC = './view/sass/**/*.scss';
var SASS_DEST = './static/css';
var JS_SRC = './view/js/**/*.js';
var JS_DEST = './static/js';
var IMG_SRC = './view/img/*';
var IMG_DEST = './static/img';

// Setup styles, scripts & images once then watch
gulp.task('default', ['setup-styles', 'setup-scripts', 'setup-images', 'watch']);

// Minify templates
gulp.task('setup-templates-min', function() {
    return gulp.src(TEMPLATE_SRC)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(TEMPLATE_DEST));
});

// Recompile Sass into CSS, auto-prefix it & inject into browser
gulp.task('setup-styles', function() {
    gulp.src(SASS_SRC)
        .pipe(sass())
        .pipe(autoprefixer({
            browser: ['last 2 versions']
        }))
        .pipe(gulp.dest(SASS_DEST))
        .pipe(browserSync.stream());
});

// Same as 'setup-styles' except minifies
gulp.task('setup-styles-min', function() {
    gulp.src(SASS_SRC)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browser: ['last 2 versions']
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(SASS_DEST))
        .pipe(browserSync.stream());
});

// Run ESLint and concatenate all JS files
gulp.task('setup-scripts', function() {
    return gulp.src([JS_SRC])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(JS_DEST));
});


// Same as 'setup-scripts' except minifies
gulp.task('setup-scripts-min', function() {
    return gulp.src([JS_SRC])
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(JS_DEST));
});

// Compress JPEG & PNG images
gulp.task('setup-images', function() {
    return gulp.src(IMG_SRC)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(IMG_DEST));
});

// Watch any changes in templates, Sass, JS & images and update if changes occur
gulp.task('watch', function() {
    browserSync.init({
        port: 9002,
        proxy: 'localhost:9001'
    });

    gulp.watch(TEMPLATE_SRC).on('change', browserSync.reload);
    gulp.watch(SASS_SRC, ['setup-styles']);
    gulp.watch(JS_SRC, ['setup-scripts']).on('change', browserSync.reload);
    gulp.watch(IMG_SRC, ['setup-images']).on('change', browserSync.reload);
});

// Create most optimized build
gulp.task('build',  ['setup-styles-min', 'setup-scripts-min', 'setup-images']);
