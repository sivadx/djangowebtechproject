import "./styles.css";
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
const Game_h = 500;
var score = 0;
var pass = 0;
var lol = document.getElementById("score");
var req = false;
const Game_w = 650;
ctx.fillRect(0, 470, 650, 30);
var frame = 1;
var i = 0;
var j = 0;
var x = 300;
var square = {
  xpos: 15,
  ypos: 455,
  size: 15,
  y_velocity: 0,
  jumping: false,
  jump: function() {
    this.ypos += 45;
  }
};
var control = {
  up: false
};
function keyListener(addEventListener) {
  var key_state = addEventListener.type === "keydown" ? true : false;
  if (addEventListener.keyCode === 32) {
    control.up = key_state;
  }
}
i = 0;
var obstacles = [{ width: 10, height: 50, ypos: 420, xpos: 300 }];
function square_update() {
  ctx.clearRect(square.xpos, square.ypos, square.size, square.size);
  if (control.up && square.jumping === false) {
    square.y_velocity -= 33;
    square.jumping = true;
  }
  square.y_velocity += 1.5;
  square.ypos += square.y_velocity;
  square.y_velocity *= 0.9;
  if (square.ypos > 455) {
    square.jumping = false;
    square.ypos = 455;
    square.y_velocity = 0;
  }
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(square.xpos, square.ypos, square.size, square.size);
  if (obstacles.length > pass) {
    if (
      square.xpos + square.size >= obstacles[i].xpos &&
      square.xpos <= obstacles[i].xpos + obstacles[i].width
    ) {
      if (square.ypos + square.size >= obstacles[i].ypos) {
        req = true;
      }
    }
  }
  if (obstacles.length > pass) {
    if (square.xpos > obstacles[i].xpos + obstacles[i].width) {
      i++;
      pass++;
    }
  }

  if (!req) {
    requestAnimationFrame(square_update);
  }
}
function game_update() {
  ctx.clearRect(0, 0, Game_w, Game_h - 30);
  if (frame === x) {
    obstacles.push({ width: 10, height: 50, ypos: 420, xpos: 635 });
    x = Math.floor(frame + 80 + Math.random() * 75);
  }
  frame++;
  obstacles.forEach(o => {
    o.xpos -= 4;
    ctx.fillStyle = "#3e4444";
    ctx.fillRect(o.xpos, o.ypos, o.width, o.height);
  });
  if (!req) {
    score++;
    lol.innerHTML = score;
    requestAnimationFrame(game_update);
  }
}

document.addEventListener("keydown", keyListener);
document.addEventListener("keyup", keyListener);
requestAnimationFrame(game_update);
requestAnimationFrame(square_update);

