var $rows = $('.row')
var bankSimulation = new BankSimulation({
  arriveAction(i, time, durtime) {
    $('<div>')
      .addClass('item')
      .css({
        background: rc(),
        width: durtime
      })
      .text(this.customerNum)
      .appendTo($rows.eq(i));
  },
  departureAction(i, time) {
    $rows.eq(i).children().first().hide(300, function() {
      $(this).remove();
    });
  }
});
bankSimulation.start();

function rc() {
  return 'rgb(' + r(256) + ',' + r(256) + ',' + r(256) + ')';
}

function r(a) {
  return parseInt(a * Math.random());
}