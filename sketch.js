
//gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var score = 0;
var survivalTime = 0;


function preload(){
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png"         ,"sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  
}

function setup() {
createCanvas(500,500);  

monkey= createSprite(80,420,40,40);  
monkey.addAnimation("running",monkey_running);  
monkey.scale = 0.1;
    
bananaGroup = new Group();  
obstacleGroup=new Group();  

ground = createSprite(77,455,500,10);  
ground.x = ground.width /2;
ground.shapeColor = ("green");  
console.log(ground.x);

}

function draw() {
background("lightblue");
  
stroke("black");  
textSize(18);  
fill("black");  
survivalTime = Math.ceil(frameCount/frameRate())  
text("survival Time:"+survivalTime,180,50);  


 if (gameState===PLAY){
    if (ground.x < 0){
    ground.velocityX = -4 ;  
    ground.x = ground.width/2;  
  } 
 bananaFn();
 obstacleFn();
  
 if(keyDown("space")){
    monkey.velocityY = -12;  
 }  
 monkey.velocityY = monkey.velocityY + 0.8;
 monkey.collide(ground);  
 
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
       
    }
  
  
  }

  if(gameState===END){
         ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1); 
  }
  drawSprites();  
}
function bananaFn(){
//write code here to spawn the banana
 if (frameCount % 80 === 0) {
    banana = createSprite(200,200,15,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,250));
    banana.velocityX = -5;
    banana.lifetime = 300;
    
    banana.scale = 0.1;
    
  //  obstacle.depth=monkey.depth;
    
    monkey.depth = banana.depth + 1;
  
    bananaGroup.add(banana);
  }   
}
function obstacleFn() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(200,415,40,40);
    obstacle.addImage(obstacleImage);  
    obstacle.scale = 0.2;
  
    //generate random obstacles
    var rand = Math.round(random(1,2));
    
    //assign scale , velocity and lifetime to the obstacle 
    obstacle.velocityX = -5;
    obstacle.lifetime = 50;
    
   
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
