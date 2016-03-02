var n = 3;
var $containers = $('.item-container');
var $items;

var hanoi = new Hanoi({
  x: 0,
  y: 1,
  z: 2,
  n: n,
  speed: 1000,
  draw: function(x, n, z) {
    console.log('把块', n, ' 从', x, '移动到', z);
    var $item = $containers.eq(x).children().eq(0);
    $item.addClass('red')
    setTimeout(function() {
      $item.prependTo($containers[z]);
      setTimeout(function() {
        $item.removeClass('red');
      }, 500)
    }, 300);
  }
});

var $num = $('#num');
$('#btn').click(function () {
  var v = parseInt($num.val());
  if (!v) {
    alert('请输入正确数值')
  } else {
    hanoi.setNum(v);
    hanoi.stop();
    $items = $(getTemps(v));
    $containers.empty();
    $containers.eq(0).append($items);
    hanoi.start();
  }
});

function getTemps(n) {
  var _html = '';
  var max = 240;
  var min = 100;
  var step = (max - min) / n;
  for (var i = 0; i < n; i++) {
    _html += '<p style="width: ' + (min + i * step) + 'px">' + (i + 1) + '</p>';
  }
  return _html;
}