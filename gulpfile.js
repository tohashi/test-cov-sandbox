var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var rimraf = require('rimraf');
var spawn = require('child_process').spawn;
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var paths = {
    js:     './src/*.js',
    entry:  './src/app.js',
    test:   'test/test.js',
    mock: './mock.html',
    e2e:   'test/e2e.js',
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

gulp.task('test', function() {
    gulp.src(paths.mock)
        .pipe(mochaPhantomJS({reporter: 'spec'}));
});

gulp.task('e2e', ['compile', 'connect'], function () {
    var casperChild = spawn('casperjs', ['test'].concat(paths.e2e));

    casperChild.stdout.on('data', function (data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1));
    });
});

gulp.task('default', ['compile', 'watch', 'connect']);
