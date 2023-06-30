var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var botao1, botao2

//Estados do Jogo
var PLAY=1;
var END=0;
var WIN = 2
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("animation1.png","animation2.png");
  cashImg = loadImage("dog1.png");
  diamondsImg = loadImage("dog2.png");
  jwelleryImg = loadImage("dog3.png");
  swordImg = loadImage("gato1.png");
  endImg =loadAnimation("fimdeJogo.png");
  boyImg.playing = true
  
}

function setup(){
  
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canW = displayHeight; 
    createCanvas(displayWidth, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);
// Fundo se movendo
path=createSprite(canW/2,200);
path.addImage(pathImg);
path.velocityY = 4;

boyImg.frameDelay = 20

//criando menino correndo
boy = createSprite(canW/2,canW-80,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=1;

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
  
  //código para redefinir o fundo
  if(path.y > canH ){
    path.y = canH/2;
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
        boy.x=canW/2;
        boy.y=canH/2;
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
  text("Pontos: "+ treasureCollection,canW-150,30);
  }else if(gameState === WIN){
    textSize(30);
    text("Voce coletou muitos cachorros... Pode ir pioneirar agora! =D: ",canW/2 - 400,canH/2);
  }
  if(treasureCollection >= 1000){
    gameState=WIN
  
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(70, canW-70),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.03;
  cash.velocityY = 5;
  cash.lifetime = canH/5;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(70, canW-70),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = canH/5;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(70, canW-70),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.03;
  jwellery.velocityY = 5;
  jwellery.lifetime = canH/5;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(70, canW-70),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.2;
  sword.velocityY = 4;
  sword.lifetime =canH/5;
  swordGroup.add(sword);
  }
}

