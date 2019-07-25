var squares;
var spots;
var img;

function preload() {
  img=loadImage("/static/images/twitter.png");
}

function setup() {
  createCanvas(1687, 1687);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  squares = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}

function draw() {
  background(0);
  // frameRate(20)

  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      squares.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < squares.length; i++) {
    var square = squares[i];

    if (square.growing) {
      if (square.edges()) {
        square.growing = false;
      } else {
        for (var j = 0; j < squares.length; j++) {
          var other = squares[j];
          if (square !== other) {
            var d = dist(square.x, square.y, other.x, other.y);
            var distance = square.r + other.r;

            if (d - 5 < distance) {
              square.growing = false;
              break;
            }
          }
        }
      }
    }

    square.show();
    square.grow();
  }
}

function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < squares.length; i++) {
    var square = squares[i];
    var d = dist(x, y, square.x, square.y);
    if (d < square.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
