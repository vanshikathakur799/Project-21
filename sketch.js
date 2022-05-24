var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sam, samFall_Img, samImg;
var path, invisibleGround, invisibleLine, pathImage;

var coinGroup, coinImage;
var stonesGroup, stone1, stone2, stone3;

var score;
var gameOverImg,restartImg
var coinSound , gameOverSound;

function preload(){
  samImg = loadAnimation("sam 1.png","sam 2.png");
  samFall_Img = loadAnimation("sam 3.png");
  
  pathImage = loadImage("background.png");
  
  coinImage = loadImage("gold coin.png");
  
  stone1 = loadImage("stone 1.png");
  stone2 = loadImage("stone 2.png");
  stone3 = loadImage("stone 3.png");
  
  restartImg = loadImage("Restart.png")
  gameOverImg = loadImage("Game Over.png")
  
  coinSound = loadSound("coin.mp3")
  gameOverSound = loadSound("game over.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  path = createSprite(width/2,height/2);
  path.addImage(pathImage);
  path.x = path.width /2;
 
  sam = createSprite(width-1440,height/2);
  sam.addAnimation("cycling", samImg);
  sam.addAnimation("fall", samFall_Img);
  sam.scale = 0.15;

  gameOver = createSprite(width/2,height-410);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.2;
  restart.scale = 0.2;
  
  invisibleGround = createSprite(width/2,710,width,10);
  invisibleGround.visible = false;
  
  invisibleLine = createSprite(width/2,0,width,10);
  invisibleLine.visible = false;

  stonesGroup = createGroup();
  coinGroup = createGroup();

  sam.setCollider("rectangle",0,0,1300,1300);
  
  score = 0;
  
}

function draw() {
  background(0);
  
  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
    path.velocityX = -10;
    
    if (path.x < 0){
      path.x = path.width/2;
    }
    
    if(keyDown("UP_ARROW")) {
        sam.y = sam.y - 5;
    }
    
    if(keyDown("DOWN_ARROW")){
        sam.y = sam.y + 5;
    }

    spawnCoin();

    spawnStones();
    
    if(stonesGroup.isTouching(sam)){
        gameOverSound.play();
        gameState = END;
      }
        
    if(coinGroup.isTouching(sam)){
        coinSound.play();
        score = score + 10;
        coinGroup.destroyEach();
    } 
    }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

     sam.changeAnimation("fall", samFall_Img);
     //sam.addAnimation("SamFalling",samFall_Img);
      path.velocityX = 0;
     
    stonesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
     
     stonesGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0);    
   }

  sam.collide(invisibleGround);
  sam.collide(invisibleLine)
  
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();

  textSize(25);
  fill(0);
  text("Score: "+ score,width-150,40);

}

function reset(){
coinGroup.destroyEach();
stonesGroup.destroyEach();
  gameState = PLAY;
  sam.changeAnimation("cycling", samImg);
  score = 0;
}


function spawnStones(){
 if (frameCount % 80 === 0){
   var stone = createSprite(1510,Math.round(random(height-50,height-700)));
   stone.velocityX = -10;
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: stone.addImage(stone1);
              break;
      case 2: stone.addImage(stone2);
              break;
      case 3: stone.addImage(stone3);
              break;
      default: break;
    }
          
    stone.scale = 0.15;
    stone.lifetime = 500;
   
    stonesGroup.add(stone);
 }
}

function spawnCoin() {
  if (frameCount % 180 === 0) {
    var coin = createSprite(1450,Math.round(random(height-50,height-700)));
    coin.x = 1510;
    coin.addImage(coinImage);
    coin.scale = 0.8;
    coin.velocityX = -10;
    
    coin.lifetime = 1000;
    
    coinGroup.add(coin);
  }
}

