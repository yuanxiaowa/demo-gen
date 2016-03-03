var gulp = require('gulp');
var child_process = require('child_process');


gulp.task('product', ['build'], function() {
  var child = child_process.fork('../upload/github');
  child.on('message', function (m) {
    console.log(m);
  })
});