function Gobang(options) {
  this.draw = options.draw;
  this.n = 15;
  this.success = options.success;
  this.init = options.init;
}

Gobang.prototype = {
  constructor: Gobang,
  genBoards: function() {
    this.count = this.n * this.n;
    this.boards = Array(this.count);
  },
  start: function() {
    // 轮到谁了
    this.turn = 0;
    // 棋盘已放棋子数
    this.nums = 0;
    // 当前棋子
    this.current = undefined;
    // 上次棋子
    this.last = undefined;
    // 是否开始
    this.isStart = true;
    this.init();
    this.genBoards();
    this.draw();
  },
  stop: function() {
    this.isStart = false;
  },
  restart: function() {
    this.stop();
    this.start();
  },
  click: function(i) {
    if (!this.boards[i]) {
      this.last = this.current;
      this.current = i;
      this.nums++;
      this.boards[i] = this.turn === 0 ? 1 : 2;
      if (this.turn === 0) {
        this.turn = 1;
      } else {
        this.turn = 0;
      }
      this.draw();
      if (this.nums >= 9) {
        this.calc(i);
      }
    }
  },
  calc: function (i) {
    var _n = 0;
    var _i = 0;
    // 顺时针方向
    while (_i < 4) {
      // 两个方向
      _n = this.next(i, _i) + this.next(i, _i + 4);
      _i++;
      // 有连续的5个棋子
      if (_n >= 6) {
        this.success();
        this.stop();
        break;
      }
    }
  },
  next: function (i, d) {
    var _n;
    var r = parseInt(i / this.n);
    var c = i % this.n;
    var expect = this.turn === 1 ? 1 : 2;
    if (d === 0) {
    // 右上
      if (r !== 0 && c !== this.n - 1) {
        _n = i - this.n + 1;
      }
    } else if (d === 1) {
      // 右
      if (c !== this.n - 1) {
        _n = i + 1;
      }
    } else if (d === 2) {
      // 右下
      if (r !== this.n - 1 && c !== this.n - 1) {
        _n = i + this.n + 1;
      }
    } else if (d === 3) {
      // 下
      if (r !== this.n - 1) {
        _n = i + this.n;
      }
    } else if (d === 4) {
      // 左下
      if (r !== this.n - 1 && c !== 0) {
        _n = i + this.n - 1;
      }
    } else if (d === 5) {
      // 左
      if (c !== 0) {
        _n = i - 1;
      }
    } else if (d === 6) {
      // 左上
      if (c !== 0 && r !== 0) {
        _n = i - this.n - 1;
      }
    } else if (d === 7) {
      // 上
      if (r !== 0) {
        _n = i - this.n;
      }
    }
    if (_n !== undefined) {
      i = this.boards[_n];
      if (i === expect) {
        return 1 + this.next(_n, d);
      }
    }
    return 1;
  }
};
