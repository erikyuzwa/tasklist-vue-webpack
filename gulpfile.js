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
var htmlreplace = require('gulp-html-replace');
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
 * When we're finally happy with our dev work, the dist task will go through our index.html
 * and drop in things like GA snippet, git ribbons, etc.
 */
gulp.task('replace', function() {
  gulp.src(['./app/index.html'])
    .pipe(htmlreplace({
        'ribbon': '<a href="https://github.com/erikyuzwa/tasklist-vue-webpack"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>',
        'ga': "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');ga('create', 'UA-40489093-2', 'auto');ga('send', 'pageview');</script>"
    }))
    .pipe(gulp.dest('dist/'));
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

/** when we're ready to deploy to a production site, use our string replace to drop in things
 * like GA or tracking snippets, a github ribbon, etc.
 */
gulp.task('package', ['build-client', 'replace']);