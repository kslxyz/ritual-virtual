$("canvas").click(function() {
  console.log("clicked");
  $("#overlay").hide();
});

let lightmode, darkmode;

$("input:radio").click(function() {
  let val = $(this).val();
  if(val === "lightmode") {
    lightmode = true;
    darkmode = false;
  } else {
    lightmode = false;
    darkmode = true;
  }
});

$(document).on('keydown', 'body', hideOverlay);

function hideOverlay() {
  $("#overlay").hide();
  $(document).off('keydown', 'body', hideOverlay);
}

$('input:radio').keydown(function(e)
{
    var arrowKeys = [37, 38, 39, 40];
    if (arrowKeys.indexOf(e.which) !== -1)
    {

        $("input:radio").off();
    }
});

let snake;
let rez = 10;
let w;
let h;
let img;
var o = [];
var tracker = [];
let oStart;
let clearCount = 0;
let fieldTracker = [];

function preload() {
  img = loadImage(
    "https://cdn.glitch.com/4907232f-5aca-4196-9626-33ff262b7265%2Fsnake.jpg?v=1616446314135"
  );
}

function setup() {
  var canvas = createCanvas(550, 800);
  canvas.parent("snake");
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(15);
  initO();
  initS();
  initRest();
  oStart = o.length;
  snake = new Snake();
}

let valid = 0;
let validObj;

function draw() {
  noStroke();

  scale(rez);
  if(darkmode) {
         background(0);
      image(img, w - 19, 19, 18, 38);
      fill(220);

  } else {
       drawGrid();
      blendMode(MULTIPLY);
      image(img, w - 19, 19, 18, 38);
      blendMode(BLEND);
      fill(0);
  }

  if (o.length === 0) {
    clearCount++;
    fieldTracker.push(tracker);

    for (j = 0; j < oStart; j++) {
      rect(
        fieldTracker[clearCount - 1][j].x,
        fieldTracker[clearCount - 1][j].y,
        1
      );
    }

    for (var obj of fieldTracker[clearCount - 1]) {
      let thisIndex = fieldTracker[clearCount - 1].indexOf(obj);
      if (thisIndex < oStart) {
        o.push(obj);
        // if(obj.y < 18 || obj.y > 57 || obj.x < w-20) {}
      }
    }

    tracker = [];
  }
  for (i = 0; i < o.length; i++) {
    rect(o[i].x, o[i].y, 1);
  }

  snake.eat(o);
  snake.update(tracker);
  snake.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  }
}

function initO() {
  for (i = 0; i < 43; i++) {
    o.push(createVector(6 + i, 1));
    o.push(createVector(6 + i, 2));
    o.push(createVector(6 + i, 15));
    o.push(createVector(6 + i, 16));

    // rect(6 + i, 1, 1);
    // rect(6 + i, 2, 1);
    // rect(6 + i, 15, 1);
    // rect(6 + i, 16, 1);
  }
  o.push(createVector(5, 2));
  o.push(createVector(5, 4));
  o.push(createVector(5, 13));
  o.push(createVector(5, 15));
  o.push(createVector(w - 6, 2));
  o.push(createVector(w - 6, 4));
  o.push(createVector(w - 6, 13));
  o.push(createVector(w - 6, 15));
  // rect(5, 2, 1);
  // rect(5, 4, 1);
  // rect(5, 13, 1);
  // rect(5, 15, 1);
  // rect(w - 6, 2, 1);
  // rect(w - 6, 4, 1);
  // rect(w - 6, 13, 1);
  // rect(w - 6, 15, 1);

  for (k = 0; k < 10; k++) {
    o.push(createVector(1, 4 + k));
    o.push(createVector(2, 4 + k));
    o.push(createVector(53, 4 + k));
    o.push(createVector(52, 4 + k));
    // rect(1, 4 + k, 1);
    // rect(2, 4 + k, 1);
    // rect(53, 4 + k, 1);
    // rect(52, 4 + k, 1);
  }

  //corner rounding single squares
  o.push(createVector(3, 5));
  o.push(createVector(3, 12));
  o.push(createVector(6, 3));
  o.push(createVector(6, 14));
  o.push(createVector(w - 7, 3));
  o.push(createVector(w - 7, 14));
  o.push(createVector(w - 4, 5));
  o.push(createVector(w - 4, 12));
  // rect(3, 5, 1);
  // rect(3, 12, 1);
  // rect(6, 3, 1);
  // rect(6, 14, 1);
  // rect(w - 7, 3, 1);
  // rect(w - 7, 14, 1);
  // rect(w - 4, 5, 1);
  // rect(w - 4, 12, 1);

  for (a = 0; a < 4; a++) {
    o.push(createVector(a + 2, 3));
    o.push(createVector(a + 2, 14));
    o.push(createVector(54 - (a + 2), 3));
    o.push(createVector(54 - (a + 2), 14));
    // rect(a + 2, 3, 1);
    // rect(a + 2, 14, 1);
    // rect(54 - (a + 2), 3, 1);
    // rect(54 - (a + 2), 14, 1);
  }
  for (b = 0; b < 2; b++) {
    o.push(createVector(b + 3, 4));
    o.push(createVector(b + 3, 13));
    o.push(createVector(54 - (b + 3), 4));
    o.push(createVector(54 - (b + 3), 13));
    // rect(b + 3, 4, 1);
    // rect(b + 3, 13, 1);
    // rect(54 - (b + 3), 4, 1);
    // rect(54 - (b + 3), 13, 1);
  }
  o.push(createVector(4, 2));
  o.push(createVector(4, 15));
  o.push(createVector(50, 2));
  o.push(createVector(50, 15));
  // rect(4, 2, 1);
  // rect(4, 15, 1);
  // rect(50, 2, 1);
  // rect(50, 15, 1);

  for (c = 0; c < 12; c++) {
    o.push(createVector(22 + c, 8));
    o.push(createVector(22 + c, 9));
    // rect(22 + c, 8, 1);
    // rect(22 + c, 9, 1);
  }
}

function initS() {
  for (i = 0; i < 45; i++) {
    o.push(createVector(5 + i, h - 2));
    o.push(createVector(5 + i, h - 3));
    // rect(5 + i, h - 2, 1);
    // rect(5 + i, h - 3, 1);

    if (i > 0 && i < 44) {
      //s horizontal bars
      o.push(createVector(5 + i, h - 4));
      o.push(createVector(5 + i, h - 13));
      o.push(createVector(5 + i, h - 19));
      // rect(5 + i, h - 4, 1);
      // rect(5 + i, h - 13, 1);
      // rect(5 + i, h - 19, 1);

      //o horizontal bars
      o.push(createVector(5 + i, 3));
      o.push(createVector(5 + i, 14));
      // rect(5 + i, 3, 1);
      // rect(5 + i, 14, 1);
    }

    // for (n = 0; n < 6; n++) {
    //   o.push(createVector(3,6+n));
    //   o.push(createVector(w-4,6+n));
    //   // rect(3, 6 + n, 1);
    //   // rect(w - 4, 6 + n, 1);
    // }
    o.push(createVector(5 + i, h - 11));
    o.push(createVector(5 + i, h - 12));
    o.push(createVector(5 + i, h - 20));
    o.push(createVector(5 + i, h - 21));
    // rect(5 + i, h - 11, 1);
    // rect(5 + i, h - 12, 1);
    // rect(5 + i, h - 20, 1);
    // rect(5 + i, h - 21, 1);
  }

  for (a = 0; a < 3; a++) {
    o.push(createVector(a + 2, h - 18));
    o.push(createVector(a + 2, h - 14));
    o.push(createVector(54 - (a + 2), h - 9));
    o.push(createVector(54 - (a + 2), h - 5));

    // rect(a + 2, h - 18, 1);
    // rect(a + 2, h - 14, 1);
    // rect(54 - (a + 2), h - 9, 1);
    // rect(54 - (a + 2), h - 5, 1);
  }

  o.push(createVector(3, 63));
  o.push(createVector(3, 65));
  // rect(3, 63, 1);
  // rect(3, 65, 1);

  o.push(createVector(3, h - 16));
  o.push(createVector(3, h - 20));
  o.push(createVector(3, h - 19));
  o.push(createVector(w - 3, h - 10));
  o.push(createVector(w - 4, h - 11));
  o.push(createVector(w - 5, h - 12));
  // rect(3, h - 16, 1);
  // rect(3, h - 20, 1);
  // rect(2, h - 19, 1);
  // rect(w - 3, h - 10, 1);
  // rect(w - 4, h - 11, 1);
  // rect(w - 5, h - 12, 1);
  o.push(createVector(w - 3, h - 4));
  o.push(createVector(w - 4, h - 3));
  o.push(createVector(w - 5, h - 2));
  o.push(createVector(w - 2, h - 9));
  // rect(w - 3, h - 4, 1);
  // rect(w - 4, h - 3, 1);
  // rect(w - 5, h - 2, 1);
  // rect(w - 2, h - 9, 1);

  //s end curve 4-blocks
  for (d = 0; d < 2; d++) {
    for (e = 0; e < 2; e++) {
      o.push(createVector(e + 1, d + h - 7));
      o.push(createVector(e + 3, d + h - 5));
      o.push(createVector(e + w - 3, d + h - 17));
      o.push(createVector(e + w - 5, d + h - 19));
      // rect(e + 1, d + h - 7, 1);
      // rect(e + 3, d + h - 5, 1);
      // rect(e + w - 3, d + h - 17, 1);
      // rect(e + w - 5, d + h - 19, 1);
    }
  }

  for (f = 0; f < 3; f++) {
    o.push(createVector(f + 1, h - 8));
    // rect(f + 1, h - 8, 1);
  }
  o.push(createVector(2, h - 5));
  o.push(createVector(2, h - 4));
  o.push(createVector(4, h - 3));
  o.push(createVector(3, h - 6));
  o.push(createVector(3, h - 7));
  o.push(createVector(3, h - 3));
  o.push(createVector(4, h - 2));
  o.push(createVector(5, h - 4));
  // rect(2, h - 5, 1);
  // rect(2, h - 4, 1);
  // rect(4, h - 3, 1);
  // rect(3, h - 6, 1);
  // rect(3, h - 7, 1);
  // rect(3, h - 3, 1);
  // rect(4, h - 2, 1);
  // rect(5, h - 4, 1);

  o.push(createVector(w - 3, h - 18));
  o.push(createVector(w - 3, h - 19));
  o.push(createVector(w - 4, h - 16));
  o.push(createVector(w - 4, h - 17));
  o.push(createVector(w - 5, h - 20));
  // rect(w - 3, h - 18, 1);
  // rect(w - 3, h - 19, 1);
  // rect(w - 4, h - 16, 1);
  // rect(w - 4, h - 17, 1);
  // rect(w - 5, h - 20, 1);

  o.push(createVector(w - 4, h - 20));
  o.push(createVector(w - 5, h - 21));
  o.push(createVector(w - 6, h - 19));
  // rect(w - 4, h - 20, 1);
  // rect(w - 5, h - 21, 1);
  // rect(w - 6, h - 19, 1);

  for (b = 0; b < 3; b++) {
    o.push(createVector(b + 3, h - 19));
    o.push(createVector(b + 3, h - 13));
    // rect(b + 3, h - 19, 1);
    // rect(b + 3, h - 13, 1);
    o.push(createVector(54 - (b + 3), h - 10));
    o.push(createVector(54 - (b + 3), h - 4));
    // rect(54 - (b + 3), h - 10, 1);
    // rect(54 - (b + 3), h - 4, 1);
  }

  for (c = 0; c < 6; c++) {
    if (c < 3) {
      o.push(createVector(1, h - 15 - c));
      o.push(createVector(w - 2, h - 6 - c));
      // rect(1, h - 15 - c, 1);
      // rect(w - 2, h - 6 - c, 1);
    } else {
      o.push(createVector(2, h - 12 - c));
      o.push(createVector(w - 3, h - 3 - c));
      // rect(2, h - 12 - c, 1);
      // rect(w - 3, h - 3 - c, 1);
    }
  }
  o.push(createVector(w - 5, h - 11));
  o.push(createVector(w - 5, h - 3));
  o.push(createVector(4, h - 20));
  o.push(createVector(4, h - 12));
  // rect(w - 5, h - 11, 1);
  // rect(w - 5, h - 3, 1);
  // rect(4, h - 20, 1);
  // rect(4, h - 12, 1);
}

function initRest() {
  for (i = 0; i < 16; i++) {
    for (j = 0; j < 2; j++) {
      o.push(createVector(4 + i, 19 + j));
      // rect(4 + i, 19 + j, 1);
      o.push(createVector(4 + i, 27 + j));
      // rect(4 + i, 27 + j, 1);
      o.push(createVector(4 + i, 32 + j));
      // rect(4 + i, 32 + j, 1);
      if (i > 8 && i < 15) {
        o.push(createVector(3 + i, 42 + j));
        // rect(3 + i, 42 + j, 1);
      }
      if (i < 7) {
        o.push(createVector(2 + i, 42 + j));
        // rect(2 + i, j + 42, 1);
      }

      if (i < 13) {
        o.push(createVector(4 + i, 47 + j));
        o.push(createVector(4 + i, 55 + j));
        // rect(4 + i, 47 + j, 1);
        // rect(4 + i, 55 + j, 1);
      }
    }
  }

  for (i = 0; i < 18; i++) {
    for (j = 0; j < 2; j++) {
      o.push(createVector(22 + j, 19 + i));
      o.push(createVector(22 + j, 39 + i));
      // rect(22 + j, 19 + i, 1);
      // rect(22 + j, 39 + i, 1);
      if (i > 10) {
        o.push(createVector(32 + j, 39 + i));
        // rect(32 + j, 39 + i, 1);
      }

      if (i < 7) {
        o.push(createVector(18 + j, 34 + i));
        o.push(createVector(10 + j, 34 + i));
        // rect(18 + j, 34 + i, 1);
        // rect(10 + j, 34 + i, 1);
      }
      if (i < 2) {
        o.push(createVector(i + 2, 32 + j));
        // rect(i + 2, 32 + j, 1);
      }
    }
  }

  for (k = 0; k < 7; k++) {
    for (m = 0; m < 2; m++) {
      o.push(createVector(24 + k, 19 + m));
      o.push(createVector(24 + k, 27 + m));
      o.push(createVector(24 + k, 35 + m));
      o.push(createVector(24 + k, 39 + m));
      o.push(createVector(24 + k, 47 + m));
      // rect(24 + k, 19 + m, 1);
      // rect(24 + k, 27 + m, 1);
      // rect(24 + k, 35 + m, 1);
      // rect(24 + k, 39 + m, 1);
      // rect(24 + k, 47 + m, 1);
    }
  }

  for (a = 0; a < 4; a++) {
    o.push(createVector(9, 39 + a));
    o.push(createVector(29 + a, 49));
    // rect(9, 39 + a, 1);
    // rect(29 + a, 49, 1);

    for (b = 0; b < 2; b++) {
      o.push(createVector(b + 32, 22 + a));
      o.push(createVector(b + 32, 30 + a));
      o.push(createVector(b + 32, 42 + a));
      // rect(b + 32, 22 + a, 1);
      // rect(b + 32, 30 + a, 1);
      // rect(b + 32, 42 + a, 1);
      o.push(createVector(b + 1, 22 + a));
      o.push(createVector(b + 1, 50 + a));
      o.push(createVector(b + 18, 50 + a));
      // rect(b + 1, 22 + a, 1);
      // rect(b + 1, 50 + a, 1);
      // rect(b + 18, 50 + a, 1);
    }
  }

  for (c = 0; c < 3; c++) {
    //u
    o.push(createVector(2 + c, 21));
    o.push(createVector(2 + c, 26));
    // rect(2 + c, 21, 1);
    // rect(2 + c, 26, 1);
    //b1
    o.push(createVector(30 + c, 21));
    o.push(createVector(30 + c, 26));
    // rect(30 + c, 21, 1);
    // rect(30 + c, 26, 1);
    //b2
    o.push(createVector(30 + c, 29));
    o.push(createVector(30 + c, 34));
    // rect(30 + c, 29, 1);
    // rect(30 + c, 34, 1);
    //r in br
    o.push(createVector(30 + c, 41));
    o.push(createVector(30 + c, 46));
    // rect(30 + c, 41, 1);
    // rect(30 + c, 46, 1);
    //o1
    o.push(createVector(2 + c, 49));
    o.push(createVector(2 + c, 54));
    // rect(2 + c, 49, 1);
    // rect(2 + c, 54, 1);
    //o2
    o.push(createVector(16 + c, 49));
    o.push(createVector(16 + c, 54));
    // rect(16 + c, 49, 1);
    // rect(16 + c, 54, 1);
    //r in uor
    o.push(createVector(16 + c, 41));
    o.push(createVector(11 + c, 41));
    // rect(16 + c, 41, 1);
    // rect(11 + c, 41, 1);
  }

  // single squares
  //u corner
  o.push(createVector(3, 20));
  o.push(createVector(2, 20));
  o.push(createVector(3, 27));
  o.push(createVector(2, 27));
  // rect(3, 20, 1);
  // rect(2, 20, 1);
  // rect(3, 27, 1);
  // rect(2, 27, 1);
  //r curve
  o.push(createVector(8, 41));
  o.push(createVector(8, 40));
  // rect(8, 41, 1);
  // rect(8, 40, 1);
  //o curve
  o.push(createVector(3, 48));
  o.push(createVector(3, 55));
  o.push(createVector(17, 48));
  o.push(createVector(17, 55));
  o.push(createVector(3, 50));
  o.push(createVector(17, 53));
  // rect(3, 48, 1);
  // rect(3, 55, 1);
  // rect(17, 48, 1);
  // rect(17, 55, 1);
  // rect(3, 50, 1);
  // rect(17, 53, 1);

  //b curve
  o.push(createVector(31, 20));
  o.push(createVector(31, 22));
  o.push(createVector(31, 25));
  o.push(createVector(31, 28));
  o.push(createVector(31, 33));
  o.push(createVector(31, 35));
  o.push(createVector(32, 35));
  o.push(createVector(31, 36));
  // rect(31, 20, 1);
  // rect(31, 22, 1);
  // rect(31, 25, 1);
  // rect(31, 28, 1);
  // rect(31, 33, 1);
  // rect(31, 35, 1);
  // rect(32, 35, 1);
  // rect(31, 36, 1);

  //big r curve
  o.push(createVector(31, 40));
  o.push(createVector(31, 42));
  o.push(createVector(31, 45));
  o.push(createVector(31, 48));
  o.push(createVector(31, 50));
  // rect(31, 40, 1);
  // rect(31, 42, 1);
  // rect(31, 45, 1);
  // rect(31, 48, 1);
  // rect(31, 50, 1);
}

function drawGrid() {
  let light = 235;
  let dark = 200;
  noStroke();
  for (j = 0; j < 80; j++) {
    if (j % 2 == 0) {
      for (i = 0; i < 55; i++) {
        if (i % 2 == 0) {
          fill(dark);
        } else {
          fill(light);
        }
        rect(i, j, 1);
      }
    } else {
      for (i = 0; i < 55; i++) {
        if (i % 2 == 0) {
          fill(light);
        } else {
          fill(dark);
        }
        rect(i, j, 1);
      }
    }
  }
}
