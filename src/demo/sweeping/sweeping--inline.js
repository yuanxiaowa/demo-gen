var $sweeping = $('#sweeping');
var count = 64;
var $items = $(getItems(count));
var $remain = $('#remain');
var sweeping = new Sweeping({
  init: function() {
    for (var i = 0; i < count; i++) {
      $items.text('');
      $items[i].className = 'item';
      $remain.text(10);
    }
  },
  draw: function() {
    for (var i = 0; i < count; i++) {
      var _c = this.boards[i];
      var item = $items.eq(i);
      if (_c.clicked || !this.isStart) {
        if (_c.isMine) {
          item.addClass('mine').text('*');
        } else {
          item.addClass('clicked')
          if (_c.num) {
            item.text(_c.num);
          }
        }
      }
      $remain.text(10 - sweeping.marked);
    }
  }
});
sweeping.start();
$items.appendTo($sweeping);
$sweeping.on('click', '.item', function() {
  if (sweeping.isStart) {
    var index = $(this).index();
    var item = sweeping.boards[index];
    if (!item.clicked) {
      sweeping.click(index);
    }
  }
}).on('contextmenu', '.item', function(e) {
  e.preventDefault();
  if (sweeping.isStart && sweeping.marked < 10) {
    var $this = $(this);
    var index = $this.index();
    var item = sweeping.boards[index];
    if (!item.clicked) {
      if (item.signed) {
        $this.removeClass('signed');
      } else {
        $this.addClass('signed');
      }
      sweeping.sign(index);
      $remain.text(10 - sweeping.marked);
    }
  }
});
$('#restart').click(function() {
  sweeping.restart();
})

function getItems(n) {
  var _html = [];
  for (var i = 0, len = n; i < len; i++) {
    _html.push('<div class="item"></div>');
  }
  return $(_html.join(''));
}