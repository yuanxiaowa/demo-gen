var $maze = $('#maze');
var items = getItems(100);
var $person = $('#person');
var mz = new Maze({
  n: 10,
  draw: function() {
    for (var i = 0; i < this.count; i++) {
      items[i].className = 'item type' + this.paths[i];
    }
    var left = 10;
    var right = 10;
    var l = this.queue[this.queue.length - 1];
    if (l) {
      var pos = this.queue[this.queue.length - 1].pos;
      left += pos % this.n * 50;
      right += Math.floor(pos / this.n) * 50;
    }
    $person.css({
      left: left,
      top: right
    });
  }
});
mz.start()
items.appendTo($maze);

function getItems(n) {
  var _html = [];
  for (var i = 0, len = n; i < len; i++) {
    _html.push('<div class="item"></div>');
  }
  return $(_html.join(''));
}
$('#restart').click(function() {
  mz.restart();
})