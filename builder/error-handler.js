var blumber = require('gulp-plumber');
var util = require('gulp-util');

module.exports = function() {
  return blumber({
    errorHandler: function() {
      console.log(arguments);
    }
  });
};