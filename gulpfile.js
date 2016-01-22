var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var HTML_LOC = './view/**/*.html';
var SASS_LOC = './view/sass/**/*.scss';

// Run styles first then watch them
gulp.task('default', ['styles', 'watch']);


// Auto-recompile Sass files on save, then live reload HTML & CSS in browser
gulp.task('watch', function() {
  browserSync.init({
    port: 9002,
    proxy: 'localhost:9001'
  });

  gulp.watch(HTML_LOC).on('change', browserSync.reload);
  gulp.watch(SASS_LOC, ['styles']);
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
