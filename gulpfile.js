var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var rimraf = require('rimraf');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var paths = {
    js:     './src/*.js',
    entry:  './src/app.js',
    test:   'test/test.js',
    mock: './mock.html',
    dest:   './dist'
};

gulp.task('clean', function(cb){
    rimraf(paths.dest, cb);
});

gulp.task('compile', ['clean'], function() {
    gulp.src([paths.entry, paths.test], {read: false})
        .pipe(browserify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['compile']);
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task

gulp.task('test', function() {
    gulp.src(paths.mock)
        .pipe(mochaPhantomJS({reporter: 'spec'}));
});

gulp.task('test-server', ['test', 'connect']);
gulp.task('default', ['compile', 'watch', 'connect']);
