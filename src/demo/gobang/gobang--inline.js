var $gobang = $('#gobang');
var $items = $(getItems(15 * 15));
var $tip = $('#tip');
var gobang = new Gobang({
  init: function () {
    for (var i = 0; i < this.count; i++) {
      $items[i].className = 'item';
    }
    $tip.text('白方开始');
  },
  draw: function() {
    if (this.current !== undefined) {
      $items.eq(this.last).removeClass('current');
      $items[this.current].className = 'item current ' + (this.turn === 1 ? 'white' : 'black');
      $tip.text(this.turn ? '黑方走棋' : '白方走棋');
    }
  },
  success: function() {
    $tip.text(this.turn === 1 ? '白方胜利' : '黑方胜利');
  }
});
gobang.start();

$items.appendTo($gobang);

$gobang.on('click', '.item', function() {
  if (gobang.isStart) {
    var index = $(this).index();
    gobang.click(index);
  }
});
$('#restart').click(function() {
  gobang.restart();
})

function getItems(n) {
  var _html = [];
  for (var i = 0, len = n; i < len; i++) {
    _html.push('<div class="item"><span></span></div>');
  }
  return $(_html.join(''));
}