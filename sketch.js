var dog,dogImg,happyDogImg;
var foodStock;
var database;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.15
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    foodStock = foodStock - 1
    writeStock(foodStock);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  fill("red");
  stroke("black")
  textSize(20)
  text("Food left: " + foodStock, 200,30);

}

function readStock(data){
  foodStock = data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

