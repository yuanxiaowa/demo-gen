var path = require('path');

var appRoot = 'src/demo/';
var destRoot = 'dest/';
var all = '**/*';

module.exports = {
  root: appRoot,
  output: destRoot,
  script: path.join(appRoot, all + '.js'),
  tpl: path.join(appRoot, all + '.jade'),
  css: path.join(appRoot, all + '.css'),
  image: path.join(appRoot, all + '.{jpg,png,gif,svg}'),
  doc: 'doc',
  base: 'src/base'
};