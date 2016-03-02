var gulp = require('gulp');
var browserSync = require('browser-sync');

var paths = require('../paths');

gulp.task('server', function() {
  browserSync({
    open: false,
    port: 8080,
    ui: {
      port: 8081
    },
    server: {
      baseDir: [paths.output],
      routes: {
        '/': './'
      }
    }
  });
});
