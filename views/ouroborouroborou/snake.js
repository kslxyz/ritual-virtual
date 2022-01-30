class Snake {
  constructor() {
    this.len = 1;
    this.body = [];
    this.body[0] = createVector(floor(w - 10), floor(h / 2 - 12));
    this.xdir = 0;
    this.ydir = 0;
    this.doublingX = false;
    this.doublingY = false;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update(arr) {
    let head = this.body[this.body.length - 1].copy();

    let check = function(element) {
      return element.x == head.x && element.y == head.y;
    };

    if (arr.some(check) == false) {
      arr.push(createVector(head.x, head.y));
    }

    if (head.x > w - 1) {
      head.x = -1;
    } else if (head.x < 0) {
      head.x = w;
    } else if (head.y > h-1) {
      head.y = -1;
    } else if (head.y < 0) {
      head.y = h;
    }

    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);

    let doubling = function(pos) {
      return head.x == pos.x && head.y == pos.y;
    };

    if (this.body.findIndex(doubling) !== this.body.length - 1) {
      this.body = this.body.slice(-1);
    }
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  //   loopAround() {
  //     let x = this.body[this.body.length-1].x;
  //     let y = this.body[this.body.length-1].y;

  //     if(x>w-1) {
  //       this.body[0].x = 0;
  //     } else if (x<0) {
  //       this.body[0].x = w-1;
  //     } else if(y > h-1) {
  //       this.body[0].y = 0;
  //     } else if (y<0) {
  //       this.body[0].y = h-1;
  //     }

  //     if (x > w-1 || x <0 || y > h-1 || y < 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  eat(arr) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;

    let check = arr.findIndex(pos => {
      return pos.x === x && pos.y === y;
    });
    if (check !== -1) {
      arr.splice(check, 1);
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(255, 0, 0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
