function Maze(options) {
  this.n = options.n;
  this.count = Math.pow(options.n, 2);
  this.paths = Array(this.count);
  this.queue = Array();
  this.delay = options.delay ? options.delay : 200;
  this.draw = options.draw;
  this.success = options.success || this.tip('找到出口了');
  this.failed = options.failed || this.tip('迷宫无解');
  this.startPos = 0;
  this.stopPos = this.count - 1;
}
Maze.prototype = {
  constructor: Maze,
  tip: function(txt) {
    return function() {
      alert(txt);
    }
  },
  timer: null,
  // 生成迷宫
  genMaze: function() {
    for (var i = 0; i < this.count; i++) {
      this.paths[i] = this.startPos === i || this.stopPos === i || Math.random() < 0.5 ? 0 : 1;
    }
  },
  start: function() {
    var self = this;
    self.genMaze();

    self.curPos = self.startPos;
    self.findNext();
    self.draw();

    self.timer = setInterval(function() {
      self.findNext();
      self.draw();
    }, self.delay);
  },
  findNext: function(i) {
    var pos = this.curPos;
    var next;
    if (0 === this.paths[pos]) {
      this.queue.push({
        pos: pos,
        di: 0
      });
      this.paths[pos] = 2;
      if (pos === this.stopPos) {
        this.stop();
        return this.success();
      }
      next = this.nextPos(pos, 0);
      if (next != null) {
        this.curPos = next;
      }
    } else {
      var current = this.queue.pop();
      if (current.di === 4) {
        this.paths[current.pos] = 4;
        if (!this.queue.length) {
          this.stop();
          this.failed();
        }
      } else {
        current.di++;
        this.queue.push(current);
        next = this.nextPos(current.pos, current.di);
        if (next != null) {
          this.curPos = next;
        }
      }
    }
  },
  nextPos: function(cur, dir) {
    if (0 === dir) {
      if (this.n - 1 !== cur % this.n) {
        return ++cur;
      }
    } else if (1 === dir) {
      if (this.n - 1 !== Math.floor(cur / this.n)) {
        return cur + this.n;
      }
    } else if (2 === dir) {
      if (0 !== cur % this.n) {
        return --cur;
      }
    } else if (3 === dir) {
      if (cur >= this.n) {
        return cur - this.n;
      }
    }
  },
  restart: function() {
    this.stop();
    this.start();
  },
  stop: function() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  clear: function() {
    for (var i = 0; i < this.count; i++) {
      this.paths[i] = 0;
    }
  }
}