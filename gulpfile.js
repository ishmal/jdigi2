'use strict';

let gulp = require('gulp');
let del = require('del');
let esLint = require('gulp-eslint');
let tslint = require('gulp-tslint');
let size = require('gulp-size');
let webpack = require("gulp-webpack");
let WebpackDevServer = require("webpack-dev-server");

gulp.paths = {
  tssrc: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!node_modules',
    '!**/*.{ts,coffee}.js'],
  jssrc: [
    '*.js',
    '!gulpfile.js',
    '!node_modules',
    '!**/*.{ts,coffee}.js']
};

let paths = gulp.paths;


gulp.task('eslint', function() {
  return gulp.src(paths.jssrc)
    .pipe(esLint({useEslintrc: true}))
    .pipe(esLint.format())
    .pipe(esLint.failOnError());
});

gulp.task('tslint', function() {
  return gulp.src(paths.tssrc)
    .pipe(size({showFiles: true}))
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: true,
      reportLimit: 0
    }));
});

gulp.task('lint', ['tslint', 'eslint']);

gulp.task("copy", function(cb) {
    gulp.src("./src/index.*")
    .pipe(gulp.dest("./dist"));
});

gulp.task('clean', function(cb) {
  del([
    'src/**/*.d.ts',
    'src/**/*.js',
    '!src/index.js',
    'src/**/*.js.map'
  ]).then(() => {cb();});
});

gulp.task("wp", function(callback){
  return gulp.src('src/index.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('dist/'));
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        // configuration
    });

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('default', ['lint', 'copy', 'wp']);
