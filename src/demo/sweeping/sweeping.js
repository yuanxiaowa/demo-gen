function Sweeping(options) {
  this.type = options.type;
  this.draw = options.draw;
  this.init = options.init;
  this.success = options.success || this.tip('闯关成功');
  this.failed = options.failed || this.tip('挖着雷了');
}

Sweeping.EASY = 0;
Sweeping.MEDIUM = 1;
Sweeping.HARD = 2;

Sweeping.prototype = {
  constructor: Sweeping,
  tip: function(txt) {
    return function() {
      alert(txt);
    }
  },
  genBoard: function() {
    var n, mines_count, count, mines;
    if (this.type === Sweeping.MEDIUM) {
      n = 16;
      mines_count = 40;
    } else if (this.type === Sweeping.HARD) {
      n = 32;
      mines_count = 99;
    } else {
      n = 8;
      mines_count = 10;
    }
    count = Math.pow(n, 2);
    this.n = n;
    this.remain = this.count = count;
    this.mines_count = mines_count;
    mines = this.mines = Array(mines_count);
    this.boards = Array(count);
    while (mines_count) {
      n = parseInt(Math.random() * count);
      if (mines.indexOf(n) === -1) {
        mines[--mines_count] = n;
      }
    }
    for (var i = 0; i < count; i++) {
      var isMine = mines.indexOf(i) > -1 ? 1 : 0;
      this.boards[i] = {
        clicked: false,
        signed: false,
        isMine: isMine
      }
    }
    for (var i = 0; i < count; i++) {
      var item = this.boards[i];
      if (!item.isMine) {
        item.num = this.getNum(i);
      }
    }
  },
  getNum: function(i) {
    var _n = 0;
    var r = parseInt(i / this.n);
    var c = i % this.n;
    if (r > 0) {
      _n += this.boards[i - this.n].isMine;
      if (c > 0) {
        _n += this.boards[i - this.n - 1].isMine;
      }
      if (c < this.n - 1) {
        _n += this.boards[i - this.n + 1].isMine;
      }
    }
    if (r < this.n - 1) {
      _n += this.boards[i + this.n].isMine;
      if (c > 0) {
        _n += this.boards[i + this.n - 1].isMine;
      }
      if (c < this.n - 1) {
        _n += this.boards[i + this.n + 1].isMine;
      }
    }
    if (c > 0) {
      _n += this.boards[i - 1].isMine;
    }
    if (c < this.n - 1) {
      _n += this.boards[i + 1].isMine;
    }
    return _n;
  },
  start: function() {
    this.isStart = true;
    this.marked = 0;
    this.init();
    this.genBoard();
    this.draw();
  },
  restart: function() {
    this.stop();
    this.start();
  },
  stop: function() {
    this.isStart = false;
  },
  // 点击
  click: function(index) {
    var item = this.boards[index];
    this.remain--;
    if (item.isMine) {
      this.stop();
      this.failed();
    } else {
      this.near(index);
      if (this.remain === this.mines_count) {
        this.stop();
        this.success();
      }
    }
    this.draw();
  },
  // 从中间展开
  near: function(i) {
    var item = this.boards[i];
    // 是否已经点过
    if (!item.clicked) {
      item.clicked = true;
      // 有标记则去标记
      if (item.signed) {
        item.signed = false;
        this.marked--;
      }
      // 空位置
      if (item.num === 0) {
        var _n = 0;
        var r = parseInt(i / this.n);
        var c = i % this.n;
        if (r > 0) {
          this.near(i - this.n)
          if (c > 0) {
            this.near(i - this.n - 1);
          }
          if (c < this.n - 1) {
            this.near(i - this.n + 1);
          }
        }
        if (r < this.n - 1) {
          this.near(i + this.n);
          if (c > 0) {
            this.near(i + this.n - 1);
          }
          if (c < this.n - 1) {
            this.near(i + this.n + 1);
          }
        }
        if (c > 0) {
          this.near(i - 1);
        }
        if (c < this.n - 1) {
          this.near(i + 1);
        }
      }
    }
  },
  // 标记
  sign: function(index) {
    var item = this.boards[index];
    item.signed = !item.signed;
    if (item.signed) {
      this.marked++;
    } else {
      this.marked--;
    }
  }
}
