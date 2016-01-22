/*eslint-env node*/

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');

var HTML_LOC = './view/**/*.html';
var SASS_LOC = './view/sass/**/*.scss';
var JS_LOC = './view/js/**/*.js';

// Run styles first then watch them
gulp.task('default', ['styles', 'lint', 'watch']);

gulp.task('lint', function() {
    return gulp.src([JS_LOC])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest('./static'));
});

// Recompile Sass into CSS & auto-prefix it
gulp.task('styles', function() {
    gulp.src(SASS_LOC)
        .pipe(sass())
        .pipe(autoprefixer({
            browser: ['last 2 versions']
        }))
        .pipe(gulp.dest('./static'))
        .pipe(browserSync.stream());
});

// Auto-recompile Sass files on save, then live reload HTML & CSS in browser
gulp.task('watch', function() {
    browserSync.init({
        port: 9002,
        proxy: 'localhost:9001'
    });

    gulp.watch(HTML_LOC).on('change', browserSync.reload);
    gulp.watch(SASS_LOC, ['styles']);
    gulp.watch(JS_LOC, ['lint']).on('change', browserSync.reload);
});
