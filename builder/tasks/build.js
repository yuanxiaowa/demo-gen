var gulp = require('gulp');

var gif = require('gulp-if');
var replace = require('gulp-replace');
var jade = require('gulp-jade');
var babel = require('gulp-babel');
// 将css和js文件转化为行内样式
var fileInline = require('gulp-file-inline');
// 压缩行内js和css样式
var minifyInline = require('gulp-minify-inline');
// 压缩html
var minifyHtml = require('gulp-minify-html');
// 压缩js
var uglify = require('gulp-uglify');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');
var short = require('postcss-short');

var runSequence = require('run-sequence');
var del = require('del');

var paths = require('../paths');
var errorHandler = require('../error-handler');
var compileOptions = require('../babel-options');
var resConfig = require('../res-config');

var isProduct = process.argv.indexOf('product') > -1;
if (isProduct) {
  resConfig = resConfig.product;
} else {
  resConfig = resConfig.dev;
}

gulp.task('tpl', function() {
  var stream = gulp.src(paths.tpl)
    .pipe(replace(/^(extends)\s+(?!\.|\/)(\w*)/, function(_, _1, _2) {
      return _1 + ' ../../base/view/' + _2;
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(replace(/\$\{([^}]+)\}/g, function(_, _1) {
      return resConfig[_1.trim()];
    }))
    .pipe(gulp.dest(paths.output));
  if (isProduct) {
    stream.pipe(fileInline({
        css: {
          minify: false
        },
        js: {
          filter: function(tag) {
            var reg = /src="(\\.|[^"])*--inline.js"/;
            return reg.test(tag);
          },
          minify: false
        }
      }))
      .pipe(minifyInline())
      .pipe(minifyHtml({
        // 不去除ie的条件注释
        conditionals: true
      }))
      .pipe(gulp.dest(paths.output));
  }
});

gulp.task('css', function() {
  var options = [
    precss,
    short,
    autoprefixer
  ];
  if (isProduct) {
    options.push(cssnano);
  }
  return gulp.src(paths.css)
    .pipe(errorHandler())
    .pipe(postcss(options))
    .pipe(gulp.dest(paths.output));
});

gulp.task('script', function() {
  return gulp.src(paths.script)
    .pipe(errorHandler())
    .pipe(babel(compileOptions))
    .pipe(gif(isProduct, uglify()))
    .pipe(gulp.dest(paths.output));
});

gulp.task('clean', function() {
  del([paths.output + '**/*', '!' + paths.output + '{.git,params.json,README.md}']);
});
gulp.task('build', function() {
  runSequence('clean', ['css', 'script'], 'tpl');
});