/*eslint-env node*/

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var HTML_SRC = './view/**/*.html';
var SASS_SRC = './view/sass/**/*.scss';
var SASS_DEST = './static/css';
var JS_SRC = './view/js/**/*.js';
var JS_DEST = './static/js';
var IMG_SRC = './view/img/*';
var IMG_DEST = './static/img';

// Run setup-styles first then watch them
gulp.task('default', ['setup-styles', 'setup-scripts', 'setup-images', 'watch']);

// Recompile Sass into CSS & auto-prefix it
gulp.task('setup-styles', function() {
    gulp.src(SASS_SRC)
        .pipe(sass())
        .pipe(autoprefixer({
            browser: ['last 2 versions']
        }))
        .pipe(gulp.dest(SASS_DEST))
        .pipe(browserSync.stream());
});

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

gulp.task('setup-scripts', function() {
    return gulp.src([JS_SRC])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(JS_DEST));
});

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

gulp.task('setup-images', function() {
    return gulp.src(IMG_SRC)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(IMG_DEST));
});

// Auto-recompile Sass files on save, then live reload HTML & CSS in browser
gulp.task('watch', function() {
    browserSync.init({
        port: 9002,
        proxy: 'localhost:9001'
    });

    gulp.watch(HTML_SRC).on('change', browserSync.reload);
    gulp.watch(SASS_SRC, ['setup-styles']);
    gulp.watch(JS_SRC, ['setup-scripts']).on('change', browserSync.reload);
    gulp.watch(IMG_SRC, ['setup-images']).on('change', browserSync.reload);
});

gulp.task('build',  ['setup-styles-min', 'setup-scripts-min', 'setup-images']);
