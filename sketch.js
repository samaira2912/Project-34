var dog, happyDog, database, foodStock;
foodS = 0;    
var dogImage,dogImage1;

function preload(){
  dogImage = loadImage("images/dogImg.png")
  dogImage1 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
   database = firebase.database();

  dog = createSprite(250, 250, 20, 20);
  dog.addImage("dog1", dogImage);
  dog.addImage("dog2", dogImage1);
  dog.scale = 0.2;

  foodStock =database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background("white");

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.changeAnimation("dog2", dogImage1); 
  }

  database = firebase.database();
  
  drawSprites();

  textAlign(CENTER, CENTER)
  textSize(20);
  text("Press the 'up arrow key' to feed a Brownie to the dog!", 250, 30);
  text("Food Stock Level: " + foodS, 250, 150);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(y) {
  if (y <= 0) {
    y = 0
  } else {
    y = y - 1 
  }
  database.ref("/").update({
    Food: y
  })
}
