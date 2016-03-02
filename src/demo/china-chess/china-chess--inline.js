var $chessContainer = $('.chess-container');
var $gridHref = $('.grid-href');
var $items = $(getChesses()).appendTo($chessContainer);
getGrids();
getHref();

$(document).on('selectstart', function() {
  return false;
});

$chessContainer.on('click', 'div', function() {
  if (chess.isStart) {
    var $this = $(this);
    var b = chess.click($this.index());
    if (!b) {
      console.log('移动失败');
    }
  }
});
$gridHref.on('click', 'div', function() {
  if (chess.isStart) {
    var b = chess.move($(this).index());
    if (!b) {
      console.log('移动失败');
    }
  }
});
$('#restart').click(function () {
  chess.restart();
});

var chess = new ChinaChess({
  init: function() {
    for (var i = 0; i < this.boards.length; i++) {
      var item = this.boards[i];
      var $item = $items.eq(i);
      $item[0].className = item.owner === 1 ? 'black' : 'red';
    }
  },
  draw: function() {
    var i = 0;
    for (; i < this.boards.length; i++) {
      var item = this.boards[i];
      var $item = $items.eq(i);
      $item.text(item.name).css({
        top: parseInt(item.pos / 9) * 80 - 25,
        left: item.pos % 9 * 80 - 25
      });
      if (this.current === i) {
        $item.addClass('current');
      } else {
        $item.removeClass('current');
      }
      if (item.disabled) {
        $item.addClass('hide');
      } else {
        $item.removeClass('hide');
      }
    }
  },
  success: function() {
    if (this.turn === 0) {
      alert('黑方胜利');
    } else {
      alert('红方胜利');
    }
  }
});
chess.start();

function getChesses() {
  var _html = '';
  for (var i = 0; i < 32; i++) {
    _html += '<div></div>';
  }
  return _html;
}

function getGrids() {
  var _html = '';
  for (var i = 0; i < 32; i++) {
    _html += '<div class="grid"></div>';
  }
  $('.top').append(_html);
  $('.bottom').append(_html);
}

function getHref() {
  var _html = '';
  for (var i = 0; i < 90; i++) {
    _html += '<div></div>';
  }
  $gridHref.append(_html);
}