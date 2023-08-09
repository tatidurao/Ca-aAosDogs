var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var botao1, botao2

//Estados do Jogo
var PLAY=1;
var END=0;
var WIN = 2;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("animation1.png","animation2.png");
  cashImg = loadImage("dog1_2.png");
  diamondsImg = loadImage("dog2_2.png");
  jwelleryImg = loadImage("dog3_2.png");
  swordImg = loadImage("gato1.png");
  endImg =loadAnimation("fimdeJogo.png");
  boyImg.playing = true
  
}

function setup(){
  
  createCanvas(500,700);
  frameRate(80);
// Fundo se movendo
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;

boyImg.frameDelay = 20

//criando menino correndo
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.7;

//botao1 = createSprite(width/2-400,height-20,20,20);
//botao2 = createSprite(width/2+400,height-20,20,20);
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  if(treasureCollection >= 2000){
    gameState=WIN
  
  }
  
  //código para redefinir o fundo
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }

  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Pontos: "+ treasureCollection,width-150,30);
  }
  else if(gameState === WIN){
    textSize(30);
    text("Voce coletou muitos cachorros... =D",width/2 - 400,height/2);
  }
  

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(70, width-70),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.3;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(70, width-70),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.3;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(70, width-70),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.3;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(70, width-70),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
