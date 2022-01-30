
var imageArray = [];
var imagePosArray = [];

var adWords;

var canvas;

function preload() {
    computers = loadImage('data/computers.jpg');
    exoband = loadImage('data/exoband.png');
    food = loadImage('data/food.jpg');
    hiphopmusic = loadImage('data/hiphopmusic.jpg');
    motiongraphics = loadImage('data/motiongraphics.jpg');
    skin = loadImage('data/skin.jpg');
    software = loadImage('data/software.jpg');
    vertebrate = loadImage('data/vertebrate.jpg');
    videogames = loadImage('data/videogames.jpg');
    
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    imageArray = [computers, exoband,food,hiphopmusic,motiongraphics,skin,software,vertebrate,videogames];
}


function initializePosArray() {
    for (let i = 0; i < 10; i++) {
      let imagePos = {
        x: random(width-100),
        y: random(height - 100),
      }
  
      imagePosArray.push(imagePos);
    }
  }

function drawSpread() {

    for (imagePos of imagePosArray) {
        let randomIndex = random(Math.floor(imageArray.length));
        image(imageArray[randomIndex], imagePos.x, imagePos.y, 150, 150);
    }
    //background(150);
  
    image(computers, random(width-100), random(height-100), computers.width,computers.height);
    image(exoband, random(width-100), random(height-100), exoband.width,exoband.height);
    image(food, random(width-100), random(height-100), food.width,food.height);
    image(hiphopmusic, random(width-100), random(height-100), hiphopmusic.width,hiphopmusic.height);
    image(motiongraphics, random(width-100), random(height-100), motiongraphics.width,motiongraphics.height);
    image(skin, random(width-100), random(height-100), skin.width,skin.height);
    image(software, random(width-100), random(height-100), software.width,software.height);image(vertebrate, random(width-100), random(height-100), vertebrate.width,vertebrate.height);
    image(videogames, random(width-100), random(height-100), videogames.width,videogames.height);
    console.log('done');
  }

function keyPressed() {
    if (keyCode === RETURN) {
        background(255);
        /*for (var i = 0; i < 10; i++) {
            var adWords = getRandomItem(imageArray);
            */
        drawSpread();

            
        }
    }


function getRandomItem(arr) {
    random(Math.floor(arr.length))
}