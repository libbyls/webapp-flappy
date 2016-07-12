// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(720, 400, Phaser.AUTO, 'game', stateActions);
var score;
score =0;

var player;
var labelScore;

var pipes = [];
//loads the stuff for the game//

function preload() {
game.load.image("playerImg", "../assets/easy.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe_mint.png");
}

//the stuff in the game//

function create() {
  game.stage.setBackgroundColor("#F3B6C2");
  game.add.text(300, 15, "have fun pals", {font: "20px Courier", fill: "#FFFFFF"});


  labelScore = game.add.text(100,40,"0", {font: "40px Courier", fill: "#FFFFFF" });
  player = game.add.sprite(100, 200, "playerImg");

game.physics.startSystem(Phaser.Physics.Arcade);
game.physics.arcade.enable(player);
player.body.gravity.y = 800;

game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(playerJump);

//the stuff in the game that moves//
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
    pipeInterval,
    generatePipe
);

}

function update(){
game.physics.arcade.overlap(player,pipes,gameOver);
if (player.y < 0 || player.y > 400){
  gameOver();
}


}

function gameOver(){
  registerScore(score);
  game.state.restart();
}

function moveRight() {
    player.x = player.x + 30;
}

function moveLeft() {
    player.x = player.x - 30;
}

function moveUp() {
    player.y = player.y - 30;
}

function moveDown() {
    player.y = player.y + 30;
}
  function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
  }

function generatePipe() {
    var gapStart = game.rnd.integerInRange(1, 5);
 for (var count=0; count<8; count=count+1) {
     if(count != gapStart && count != gapStart + 1) {
        addPipeBlock(800, count*50);
     }
 }
 changeScore();
}
function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -300;
}

function playerJump() {
  player.body.velocity.y=-300;
}
