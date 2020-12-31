//Create variables here
var dog,happydDog
var database,foodStock,foodS;


function preload(){
  //load images here
  dogimg = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
}

function setup() {
  var canvas = createCanvas(500,500);
  
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock)
  foodStock.set(20)
  dog = createSprite(420,350,10,10);
  dog.addImage(dogimg);
  dog.scale = 0.2;
  
}
 
function draw() {  
background("pink");

  
  if(foodS !== undefined){
  fill("blue");
  textSize(22);
  stroke(100);
  text("PRESS UP ARROW KEY TO FEED  MILK ",10,100);
  text("food remaining :"+foodS,150,150)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimg2);
  }
  
     
  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(dogimg);
    
  
  }
  if(foodS === 0){
     foodS = 20
  }
  
  drawSprites();
}
}
function writeStock(x){
 if(x<=0){
  x = 0
 }else{
   x = x-1
 }
 database.ref("/").update({
   food:x
 })

 
  }
function readStock(data){
  foodS=data.val();
}



