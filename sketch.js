var balloon, database;
var position;

function preload () {
  backImg = loadImage ("Images/City.png");

  balloon1 = loadAnimation ("Images/B-1.png");
  balloon2 = loadAnimation ("Images/B-1.png","Images/B-1.png", "Images/B-1.png", "Images/B-2.png", "Images/B-2.png", "Images/B-2.png", "Images/B-3.png", "Images/B-3.png", "Images/B-3.png");
  

}
function setup() {
  database = firebase.database();
  
  createCanvas(1500, 700);

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation ("not flying", balloon1);
  balloon.addAnimation ("flying", balloon2);

  var balloonPosition = database.ref('ballon/position');
  balloonPosition.on("value", readPosition, showError);
}

function draw() {
  background(backImg);  

  if (keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
  }
   else if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x + 10;
  } 
  else if (keyDown(UP_ARROW)) {
    balloon.y = balloon.y - 10;
  } 
  else if (keyDown(DOWN_ARROW)) {
    balloon.y = balloon.y + 10;
  }
  
  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}