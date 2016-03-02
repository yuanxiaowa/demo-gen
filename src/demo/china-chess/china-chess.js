function ChinaChess(options) {
  this.count = 90;
  this.draw = options.draw;
  this.init = options.init;
  this.success = options.success;
}

ChinaChess.prototype = {
  constructor: ChinaChess,
  genBoards: function() {
    // 棋子
    var boards = this.boards = Array();
    // 棋盘
    var chesses = this.chesses = Array(this.count);
    var arr = ['將', '士', '象', '馬', '車'];
    var arr1 = ['帥', '仕', '相', '馬', '車'];
    var ct = 4;
    var _i = 0;
    var i;
    for (i = 0; i < arr.length; i++) {
      if (i) {
        boards.push({
          type: i,
          name: arr[i],
          pos: ct + i,
          owner: 0
        });
        boards.push({
          type: i,
          name: arr[i],
          pos: ct - i,
          owner: 0
        });
        boards.push({
          type: i,
          name: arr1[i],
          pos: this.count - 1 - ct - i,
          owner: 1
        });
        boards.push({
          type: i,
          name: arr1[i],
          pos: this.count - 1 - ct + i,
          owner: 1
        });
      } else {
        boards.push({
          type: i,
          name: arr[i],
          pos: ct,
          owner: 0
        });
        boards.push({
          type: i,
          name: arr1[i],
          pos: this.count - 1 - ct,
          owner: 1
        });
      }
    }
    ct += 2 * 9;
    boards.push({
      type: 5,
      name: '炮',
      pos: ct - 3,
      owner: 0
    });
    boards.push({
      type: 5,
      name: '炮',
      pos: ct + 3,
      owner: 0
    });
    boards.push({
      type: 5,
      name: '炮',
      pos: this.count - 1 - ct + 3,
      owner: 1
    });
    boards.push({
      type: 5,
      name: '炮',
      pos: this.count - 1 - ct - 3,
      owner: 1
    });
    ct += 9;
    for (i = 0; i < 3; i++) {
      if (i) {
        boards.push({
          type: 6,
          name: '卒',
          pos: ct + i * 2,
          owner: 0
        });
        boards.push({
          type: 6,
          name: '卒',
          pos: ct - i * 2,
          owner: 0
        });
        boards.push({
          type: 6,
          name: '兵',
          pos: this.count - 1 - ct - i * 2,
          owner: 1
        });
        boards.push({
          type: 6,
          name: '兵',
          pos: this.count - 1 - ct + i * 2,
          owner: 1
        });
      } else {
        boards.push({
          type: 6,
          name: '卒',
          pos: ct,
          owner: 0
        });
        boards.push({
          type: 6,
          name: '兵',
          pos: this.count - 1 - ct,
          owner: 1
        });
      }
    }
    for (i = 0; i < boards.length; i++) {
      chesses[boards[i].pos] = i;
    }
  },
  start: function() {
    this.turn = 1;
    this.isStart = true;
    this.current = undefined;
    this.last = undefined;
    this.genBoards();
    this.init();
    this.draw();
  },
  stop: function() {
    this.isStart = false;
  },
  restart: function() {
    this.stop();
    this.start();
  },
  // 单击i棋子
  click: function(i) {
    var item = this.boards[i];
    if (this.turn === item.owner) {
      // 自方棋子
      if (this.current !== i) {
        this.current = i;
      } else {
        this.current = undefined;
      }
      this.draw();
      return true;
    } else {
      // 对方棋子
      return this.move(item.pos);
    }
  },
  // 移动棋子到i位置
  move: function(i) {
    // 移动之前得有选中棋子
    if (this.current !== undefined) {
      // 当前棋子
      var item = this.boards[this.current];
      // 当前是不是这边走棋
      if (this.turn === item.owner) {
        // 从当前位置到i位置可以吗
        if (this.isValid(i)) {
          // 棋盘i位置的值
          var _item = this.chesses[i];
          // 更新棋盘i位置的值为当前棋子
          this.chesses[i] = this.current;
          // 更新棋盘当前位置为空
          this.chesses[item.pos] = undefined;
          // 把当前位置放在lastPos里面
          // this.lastPos = item.pos;
          // 更新棋子在期盼中的位置
          item.pos = i;
          // 轮到对方走棋
          if (this.turn === 0) {
            this.turn = 1;
          } else {
            this.turn = 0;
          }
          // 是空位置
          if (_item !== undefined) {
            // 把对应棋子吃掉
            this.boards[_item].disabled = true;
            if (this.boards[_item].type === 0) {
              this.isStart = false;
              this.success();
            }
          }
          this.draw();
          return true;
        }
      }
    }
  },
  // 获取棋盘某个位置的棋子值
  getPos: function(r, c) {
    var pos = r * 9 + c;
    return this.chesses[pos];
  },
  // i->j间有多少棋子
  between: function(i, j) {
    var r1 = parseInt(i / 9);
    var c1 = i % 9;
    var r2 = parseInt(j / 9);
    var c2 = j % 9;
    var n = 0;
    var dx = 1;
    if (r1 === r2) {
      // 横线方向
      if (c2 < c1) {
        dx = -1;
      }
      while ((c1 += dx) !== c2) {
        if (this.getPos(r1, c1) !== undefined) {
          n += 1;
        }
      }
    } else if (c1 === c2) {
      // 竖线方向
      if (r2 < r1) {
        dx = -1;
      }
      while ((r1 += dx) !== r2) {
        if (this.getPos(r1, c1) !== undefined) {
          n += 1;
        }
      }
    } else {
      var x = Math.pow(r1 - r2, 2) + Math.pow(c1 - c2, 2);
      if (x === 8) {
        // 象是否卡住
        if (this.getPos((r1 + r2) / 2, (c1 + c2) / 2) !== undefined) {
          n += 1;
        }
      } else if (x === 5) {
        // 马脚是否卡住情况
        var dr = r1 - r2;
        var dc = c1 - c2;
        if (dr === 2 || dr === -2) {
          if (dr === 2) {
            dx = -1;
          }
          if (this.getPos(r1 + dx, c1) !== undefined) {
            n += 1;
          }
        } else if (dc === 2 || dc === -2) {
          if (dc === 2) {
            dx = -1;
          }
          if (this.getPos(r1, c1 + dx) !== undefined) {
            n += 1;
          }
        }
      }
    }
    return n;
  },
  // 从当前位置到位置d是否可通过
  isValid: function(d) {
    var dr, dc;
    // 当前位置棋子
    var item = this.boards[this.current];
    var cp = item.pos;
    var owner = item.owner;
    var i = d;
    // 下方的棋子，为了好计算，转换成上方的
    if (owner === 1) {
      i = this.count - 1 - i;
      cp = this.count - 1 - cp;
    }
    // 当前行
    var r1 = parseInt(cp / 9);
    // 当前列
    var c1 = parseInt(cp % 9);
    // 需要跳转到的行
    var r2 = parseInt(i / 9);
    // 需要跳转到的列
    var c2 = parseInt(i % 9);
    // 行差
    dr = r2 - r1;
    // 列差
    dc = c2 - c1;
    // 行差于列差的平方和
    var _x = dr * dr + dc * dc;
    if (item.type === 0) {
      // 将
      // 只能走前三行
      if (r2 <= 2) {
        // 只能走4列到6列
        if (c2 >= 3 && c2 <= 5) {
          // 只能横着或竖着走一步
          if (_x === 1) {
            return true;
          }
        }
      }
    } else if (item.type === 1) {
      // 士
      // 基本同将
      if (r2 <= 2) {
        if (c2 >= 3 && c2 <= 5) {
          // 只能斜着走一步
          if (_x === 2) {
            return true;
          }
        }
      }
    } else if (item.type === 2) {
      // 相
      // 不能过河
      if (r2 <= 4) {
        // 列数为偶数
        if (c2 % 2 === 0) {
          // 只能走田
          if (_x === 8) {
            // 田中间不能有棋子
            if (this.between(item.pos, d) === 0) {
              return true;
            }
          }
        }
      }
    } else if (item.type === 3) {
      // 马
      // 只能走日
      if (_x === 5) {
        // 不能卡住马脚
        if (this.between(item.pos, d) === 0) {
          return true;
        }
      }
    } else if (item.type === 4) {
      // 车
      // 只能横着或竖着走
      if (dr === 0 || dc === 0) {
        // 中间不能有子
        if (this.between(item.pos, d) === 0) {
          return true;
        }
      }
    } else if (item.type === 5) {
      // 炮
      // 只能横着或竖着走
      if (dr === 0 || dc === 0) {
        var _v = this.between(item.pos, d);
        var endPos = this.chesses[d];
        if (_v === 0) {
          // 中间没棋子
          if (endPos === undefined) {
            return true;
          }
        } else if (_v === 1) {
          // 中间有一个棋子，且跳到的位置也有棋子
          if (endPos !== undefined) {
            return true;
          }
        }
      }
    } else if (item.type === 6) {
      // 兵
      // 只能横着或竖着走一步
      if (_x === 1) {
        if (dr === 1) {
          // 往前
          return true;
        } else if (dr === 0) {
          // 过河后可以左右走一步
          if (r1 > 4) {
            return true;
          }
        }
      }
    }
  }
}
