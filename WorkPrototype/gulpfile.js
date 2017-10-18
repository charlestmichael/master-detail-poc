var gulp = require('gulp');
var gulpsass = require('gulp-sass');
var path = require('path');
var stylemod = require('gulp-style-modules');
const del = require('del');
var connect = require('gulp-connect');

/*
    Call to create the styles modules, then delete the leftover CSS pages
 */
gulp.task('create-style-modules',['compile-scss'],function(){
    del(['./elements/**/*.css']);
});

/*
    Compile SASS pages into CSS and then creates Polymer Style modules
    (-styles.html)
 */
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

/*
    Call to create the style modules, delete the CSS pages, then start a gulp web server.
 */
gulp.task('serve', ['create-style-modules'], function () {
    connect.server({
        root: './',
        port: 8887,
        livereload: true
    });
});
