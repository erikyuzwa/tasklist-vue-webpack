/**
 * Grunt or gulp fits into your project as the "peon" between Webpack and your app. Gulp can take care of
 * things like linting your JavaScript for obvious problems, minifying and compiling SASS or any ES6 modules
 */
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var webpack = require('webpack-stream');
var fs = require('fs');

/**
 * the basic lint task. Define our source files to keep an eye on
 */
gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', './app/scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true}))
    .pipe(jshint.reporter('fail'));
});

/**
 * the basic sass task. Define our scss file(s) to keep an eye on. Output the resulting css
 * to the same folder
 */
gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/styles/'));
});

/**
 * a helper method to work with our app entry point. Run it through the uglifyier, webpack and
 * babel (for any ES6 help) and put our result in the /dist folder
 */
gulp.task('build-client', ['move-client'], function () {
  return gulp.src(['app/scripts/app.js'])
    .pipe(uglify())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(babel())
    .pipe(gulp.dest('dist/'));
});

/**
 * move our applications from the app/ to the dist/. There are some files we don't want / need
 * migrated over (pretend the dist/ folder is going to a production site)
 */
gulp.task('move-client', ['lint', 'sass'], function () {
  return gulp.src(['app/**/*.*', '!app/scripts/**/*', '!app/styles/*.scss'])
    .pipe(gulp.dest('./dist/'));
});

/** our basic gulp task is to run the build-client task */
gulp.task('default', ['build-client']);