class Hanoi {
  constructor(options) {
    this.n = options.n;
    this.x = options.x;
    this.y = options.y;
    this.z = options.z;
    this.results = [];
    this.speed = options.speed || 1000;
    this.draw = options.draw;
  }

  start() {
    this.results.length = 0;
    this.isStart = true;
    this.recursion(this.n, this.x, this.y, this.z);
    this.operate();
  }

  stop() {
    this.isStart = false;
    this.results.length = 0;
  }

  setNum(_n) {
    this.n = _n;
  }

  restart() {
    this.stop();
    this.start();
  }

  operate() {
    var item = this.results.shift();
    this.draw(item[0], item[1], item[2]);
    if (this.results.length) {
      setTimeout(this.operate.bind(this), this.speed);
    }
  }

  recursion(n, x, y, z) {
    if (n === 1) {
      this.move(x, 1, z);
    } else {
      this.recursion(n - 1, x, z, y);
      this.move(x, n, z);
      this.recursion(n - 1, y, x, z);
    }
  }

  move(x, n, z) {
    this.results.push([x, n, z]);
  }
}
