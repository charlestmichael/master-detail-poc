var gulp = require('gulp');
var gulpsass = require('gulp-sass');
var path = require('path');
var stylemod = require('gulp-style-modules');
const del = require('del');
var connect = require('gulp-connect');

gulp.task('create-style-modules',['compile-scss'],function(){
    del(['./elements/**/*.css']);
});

gulp.task('compile-scss', function () {
    gulp.src('./elements/**/*.scss', {base: "./"})
        .pipe(gulpsass().on('error', gulpsass.logError))
        .pipe(stylemod({
            filename: function (file) {
                return path.basename(file.path, path.extname(file.path)) + "-styles"
            },
            moduleId: function (file) {
                return path.basename(file.path, path.extname(file.path)) + "-styles"
            }
        }))
        .pipe(gulp.dest("."))
});

gulp.task('serve', ['create-style-modules'], function () {
    connect.server({
        root: './',
        port: 8999,
        livereload: true
    });
});
