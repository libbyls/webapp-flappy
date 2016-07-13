// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score;
score =0;

var player;
var labelScore;

var pipes = [];

var width = 790;
var height = 400;
var gameSpeed = 400;
var gameGravity = 200;
var jumpPower = 400;
var gapSize = 150;
var gapMargin = 40;
var blockHeight = 50;
var pipeEndExtraWidth = 10;
var pipeEndHeight = 20;
var pipeBlock =50;
var pipeEnd;
var gapStart;

var balloons = [];
var weights = [];
//loads the stuff for the game//

function preload() {
  game.load.image("playerImg", "../assets/flappy.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.image("balloons","..assets/balloons.png");
  game.load.image("weight","assets/weight.png");
}
//the stuff in the game//

function create() {
  game.stage.setBackgroundColor("#ADD8E6");
  game.add.text(300, 15, "have fun pals", {font: "20px Courier", fill: "#000000"});


  labelScore = game.add.text(100,40,"0", {font: "40px Courier", fill: "#FFFFFF" });

  player = game.add.sprite(100, 200, "playerImg");
  player.anchor.setTo(0.5, 0.5);

  game.physics.startSystem(Phaser.Physics.Arcade);
  game.physics.arcade.enable(player);
  player.body.gravity.y = gameGravity;

  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(playerJump);


  var pipeInterval = 1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generatePipe
  );

}
//the stuff in the game that moves//
function update(){
  player.rotation = Math.atan(player.body.velocity.y / 200);
  game.physics.arcade.overlap(player,pipes,gameOver);
  if (player.y < 0 || player.y > 400){
    gameOver();
  }


}

function gameOver(){
  score= 0;
  game.state.restart();
  gameGravity = 400;
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
function generate(){
    var diceRoll = game.rnd.integerInRange(1, 10);
    if(diceRoll==1){
        generateBalloons();
    } else if(diceRoll==2){
         generateWeight();
     } else {
        generatePipe();
    }
}
function generatePipe() {

  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart; y > 0; y -= blockHeight){
        addPipeBlock(width, y - blockHeight);
    }
    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(var y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
  }
  changeScore();
}
function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}
function addPipeEnd(x,y) {
  var pipeEnd = game.add.sprite(x,y,"pipeEnd");
  pipes.push(pipeEnd);
  game.physics.arcade.enable(pipeEnd);
  pipeEnd.body.velocity.x = -200;
}
function playerJump() {
  player.body.velocity.y=-250;
}
function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}
function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = -gameSpeed;
    bonus.body.velocity.y = -game.rnd.integerInRange(60,100);
}

function generateWeight(){
    var bonus = game.add.sprite(width, 0, "weight");
    weights.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = -gameSpeed;
    bonus.body.velocity.y = game.rnd.integerInRange(60,100);
}
