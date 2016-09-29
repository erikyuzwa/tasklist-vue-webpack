'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var webpack = require('webpack-stream');
var fs = require('fs');

gulp.task('build', ['build-client']);

gulp.task('lint', function () {
  return gulp.src(['gulpfile.js', './app/scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true}))
    .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function () {
  return gulp.src('./app/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/styles/'));
});

gulp.task('build-client', ['move-client'], function () {
  return gulp.src(['app/scripts/app.js'])
    .pipe(uglify())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(babel())
    .pipe(gulp.dest('dist/'));
});

gulp.task('move-client', ['lint', 'sass'], function () {
  return gulp.src(['app/**/*.*', '!app/scripts/**/*', '!app/styles/*.scss'])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['build']);