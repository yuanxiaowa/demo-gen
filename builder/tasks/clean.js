var gulp = require('gulp');
var del = require('del');

var paths = require('../paths');

gulp.task('clean', function() {
  del([paths.output + '**/*', '!' + paths.output + '{.git,params.json,README.md}']);
});