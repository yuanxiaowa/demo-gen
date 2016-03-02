// 表达式计算
function MyExpression() {}


// 符号表
MyExpression.symbols = ['+', '-', '*', '/', '(', ')', '#'];
// 符号表优先级
MyExpression.preceds = function() {
  var len = MyExpression.symbols.length;
  var preceds = Array(Math.pow(len, 2));
  for (var i = 0; i < len; i++) {
    var _i = MyExpression.symbols[i];
    for (var j = 0; j < len; j++) {
      var _j = MyExpression.symbols[j];
      var v = undefined;
      if (_i === '#') {
        if (_j === '#') {
          v = 0;
        } else if (_j !== ')') {
          v = -1;
        }
      } else if (_j === '#') {
        if (_i !== '(') {
          v = 1;
        }
      } else if (_i === '+' || _i === '-') {
        if (_j === '+' || _j === '-' || _j === ')') {
          v = 1;
        } else {
          v = -1;
        }
      } else if (_i === '*' || _i === '/') {
        if (_j === '(') {
          v = -1;
        } else {
          v = 1;
        }
      } else if (_i === '(') {
        if (_j === ')') {
          v = 0;
        } else {
          v = -1;
        }
      } else if (_i === ')') {
        if (_j !== '(') {
          v = 1;
        }
      }
      preceds[i * len + j] = v;
    }
  }
  return preceds;
}();

// 获取优先级
MyExpression.getPreceds = function(a, b) {
  var i = this.symbols.indexOf(a);
  var j = this.symbols.indexOf(b);
  if (i >= 0 && j >= 0) {
    var c = i * this.symbols.length + j;
    var v = this.preceds[c];
    if (v === undefined) {
      throw new Error('出错');
    }
    return v;
  } else {
    throw new Error('出错');
  }
};

MyExpression.prototype = {
  constructor: MyExpression,
  getValue: function(str) {
    var optr = ['#'];
    var opnd = [];
    var n = '';
    var item;
    str += '#';
    for (var i in str) {
      item = str[i];
      if (MyExpression.symbols.indexOf(item) > -1) {
        var pr = optr[optr.length - 1];
        var gp = MyExpression.getPreceds(pr, item);
        // 栈顶符号优先级小于当前符号
        if (gp === -1) {
          // 符号进栈
          optr.push(item);
          if (n !== '') {
            // 有操作数，操作数也进栈
            opnd.push(n);
            n = '';
          }
        } else if (gp === 0) {
          // 优先级相等，符号出栈
          optr.pop();
          if (n !== '') {
            opnd.push(n);
            n = '';
          }
        } else {
          // 优先级大
          while (MyExpression.getPreceds(optr[optr.length - 1], item) === 1) {
            // 没有操作数，从栈顶取
            if (n === '') {
              n = opnd.pop();
            }
            // 符号出栈
            pr = optr.pop();
            // 运算结果入栈
            opnd.push(this.operate(opnd.pop(), n, pr));
            n = '';
          }
          if (MyExpression.getPreceds(optr[optr.length - 1], item) === 0) {
            // 当前操作符与栈顶操作符相等
            optr.pop();
          } else {
            optr.push(item);
          }
        }
      } else if (item === ' ') {
        if (n !== '') {
          opnd.push(n);
          n = '';
        }
      } else {
        n += item;
      }
    }
    if (optr.length === 0 && opnd.length === 1) {
      return opnd.pop();
    }
    throw new Error('出错了');
  },
  /**
   * 运算操作
   * @param  {number} a  操作数
   * @param  {number} b  操作数
   * @param  {string} op 运算符
   * @return {number}    运算结果
   */
  operate: function(a, b, op) {
    if (op === '+') {
      return +a + (+b);
    } else if (op === '-') {
      return a - b;
    } else if (op === '*') {
      return a * b;
    } else if (op === '/') {
      return a / b;
    }
  },
};
