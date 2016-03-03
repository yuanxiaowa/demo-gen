var child_process = require('child_process');

var p = child_process.fork('./builder/upload/github');

p.on('message', function (m) {
  console.log(m)
})
