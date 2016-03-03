var child_process = require('child_process');

child_process.exec('gulp build', function (err, data) {
  console.log(data);
});

process.on('message', function(m) {
  console.log('CHILD got message:', m);
  console.log(process.cwd())
  // process.exit();
  setTimeout(function () {
    console.log('---');
  },100)
});

process.send({ foo: 'bar' });
// console.log(process)