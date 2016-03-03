var child_process = require('child_process');

var child = child_process.exec('git add . && git commit -m "."');

child.stdout.on('data', function(data) {
  process.send(data);
});