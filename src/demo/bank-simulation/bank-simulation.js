class BankSimulation {
  constructor(options) {
    this.queueLength = options.queueLength || 4;
    this.closeTime = 10000;
    this.delay = options.delay || 1000;
    this.arriveAction = options.arriveAction;
    this.departureAction = options.departureAction;
  }

  init() {
    this.totalTime = 0;
    this.customerNum = 0;
    this.now = 0;
    this.eventList = [];
    this.linkQueue = Array(this.queueLength);
    for (var i = 0; i < this.queueLength; i++) {
      this.linkQueue[i] = [];
    }
  }

  start() {
    this.init();
    this.orderInsert(0, 0);
    this.orderHandle();
  }

  // 获取最小队列索引
  minQueueIndex() {
    var _i = 0;
    for (var i = 1; i < this.queueLength; i++) {
      if (this.linkQueue[i].length < this.linkQueue[_i].length) {
        _i = i;
      }
    }
    return _i;
  }

  // 客户到达
  customerArrived() {
    var en = this.current;
    var qindex = this.minQueueIndex();
    var durtime = 5 + parseInt(Math.random() * 25);
    var intertime = en.time + parseInt(Math.random() * 5);
    if (intertime < this.closeTime) {
      this.orderInsert(intertime, 0);
    }
    this.linkQueue[qindex].push({
      arrivalTime: en.time,
      durtime: durtime,
      num: ++this.customerNum
    });
    this.arriveAction(qindex, en.time, durtime);
    if (this.linkQueue[qindex].length === 1) {
      this.orderInsert(en.time + durtime, qindex + 1);
    }
  }

  // 客户离开
  customerDeparture() {
    var en = this.current;
    var i = en.type - 1;
    var q = this.linkQueue[i].shift();
    this.totalTime += en.time - q.arrivalTime;
    this.departureAction(i, en.time);
    if (this.linkQueue[i].length) {
      q = this.linkQueue[i][0];
      this.orderInsert(en.time + q.durtime, i + 1);
    }
  }

  // 插入事件
  orderInsert(time, type) {
    this.eventList.push({
      time: time,
      type: type
    });
    this.eventList.sort((a, b) => {
      return b.time - a.time;
    });
  }

  // 事件循环处理
  orderHandle() {
    var i = 0;
    if (this.eventList.length) {
      var en = this.current = this.eventList.pop();
      if (en.type === 0) {
        this.customerArrived();
      } else {
        this.customerDeparture();
      }
    }
    if (this.eventList.length) {
      setTimeout(this.orderHandle.bind(this), this.delay);
    }
  }
}
