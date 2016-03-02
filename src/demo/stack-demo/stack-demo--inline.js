var $txt = $('#txt');
var $tip = $('#tip');
$('#btn').click(function() {
  if (isMatchBrackets($txt.val())) {
    $tip.text('合法');
  } else {
    $tip.text('不合法');
  }
});

var $txt2 = $('#txt2');
var $tip2 = $('#tip2');
$('#btn2').click(function() {
  var val = $txt2.val();
  $tip2.prepend(getLine(val) + '<br>');
  $txt2.val('');
});

var $txt3 = $('#txt3');
var $tip3 = $('#tip3');
$('#btn3').click(function() {
  var val = $txt3.val();
  $tip3.text(switchJinzhi(val, 8));
});

var $txt4 = $('#txt4');
var $tip4 = $('#tip4');
var expression = new MyExpression;
$('#btn4').click(function() {
  var val = $txt4.val();
  try {
    $tip4.text(expression.getValue(val));
  } catch(e) {
    $tip4.text('表达式不合法');
  }
  // $txt4.val('');
});




function switchJinzhi(number, t) {
  var arr = [];
  while (number) {
    arr.push(number % t);
    number = parseInt(number / t);
  }
  return arr.reverse().join('');
}

function getLine(str) {
  var arr = [];
  for (var i = 0, len = str.length; i < len; i++) {
    var item = str[i];
    if (item === '#') {
      arr.pop();
    } else if (item === '@') {
      arr.length = 0;
    } else {
      arr.push(item);
    }
  }
  return arr.join('');
}

function isMatchBrackets(str) {
  var arr = [];
  var len = str.length;
  var b = true;
  for (var i = 0; i < len; i++) {
    var item = str[i];
    if (item === '(' || item === '[' || item === '{') {
      arr.push(item);
    } else if (item === ')') {
      if (arr.pop() !== '(') {
        b = false;
      }
    } else if (item === ']') {
      if (arr.pop() !== '[') {
        b = false;
      }
    } else if (item === '}') {
      if (arr.pop() !== '{') {
        b = false;
      }
    }
  }
  if (arr.length) {
    b = false;
  }
  return b;
}