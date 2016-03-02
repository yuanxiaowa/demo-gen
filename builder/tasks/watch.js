var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var paths = require('../paths');

gulp.task('watch', function () {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.script, ['script']);
  gulp.watch(paths.tpl, ['tpl']);
  gulp.watch(path.join(paths.root, '*'), function(stat) {
    if (stat.type === 'added' || stat.type === 'renamed') {
      var name = path.basename(stat.path);
      fs.writeFile(path.join(stat.path, name + '.js'), '');
      fs.writeFile(path.join(stat.path, name + '--inline.js'), '');
      fs.writeFile(path.join(stat.path, name + '.css'), '');
      fs.writeFile(path.join(stat.path, 'index.jade')
        , 'extends layout$.jade'
        + '\n\nblock t\n | ' + name
        + '\n\nblock h\n  +style(\'' + name + '\')'
        + '\n\nblock b\n  '
        + '\n\nappend script\n  +script([\'' + name + '\', \'' + name + '--inline\'])\n  ');
    }
  });
});