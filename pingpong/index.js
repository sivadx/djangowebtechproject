
import "./styles.css";
var con = document.getElementById("gg");
var ctx = con.getContext("2d");
var req = false;
var inster = document.getElementById("winner");
con.style.backgroundColor = "#ffe6e6";
var paddle1 = {
  xpos: 0,
  ypos: 312,
  width: 7,
  height: 100,
  yspeed: 0
};
var ball = {
  xpos: 50,
  ypos: 50,
  xspeed: 4,
  yspeed: 3,
  width: 20,
  height: 20
};

var paddle2 = {
  xpos: 618,
  ypos: 312,
  width: 7,
  height: 100,
  yspeed: 0
};
var control2 = {
  up: false,
  down: false
};
var control = {
  up: false,
  down: false
};
function move(event) {
  var key_state = event.type === "keydown" ? true : false;
  switch (event.keyCode) {
    case 38:
      control.up = key_state;
      break;
    case 40:
      control.down = key_state;
      break;
    case 81:
      control2.up = key_state;
      break;
    case 65:
      control2.down = key_state;
      break;
    default:
      break;
  }
}
function paddleloop() {
  ctx.clearRect(0, 0, 625, 625);
  if (control.up) {
    paddle1.yspeed -= 1;
  }
  if (control.down) {
    paddle1.yspeed += 1;
  }
  if (!control.up && !control.down) {
    paddle1.yspeed = 0;
  }
  paddle1.ypos += paddle1.yspeed;
  if (paddle1.ypos < 0) {
    paddle1.ypos = 0;
  }
  if (paddle1.ypos + paddle1.height > 625) {
    paddle1.ypos = 625 - paddle1.height;
  }
  if (control2.up) {
    paddle2.yspeed -= 1;
  }
  if (control2.down) {
    paddle2.yspeed += 1;
  }
  if (!control2.up && !control2.down) {
    paddle2.yspeed = 0;
  }
  paddle2.ypos += paddle2.yspeed;
  if (paddle2.ypos < 0) {
    paddle2.ypos = 0;
  }
  if (paddle2.ypos + paddle2.height > 625) {
    paddle2.ypos = 625 - paddle2.height;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, paddle1.ypos, paddle1.width, paddle1.height);
  ctx.fillStyle = "black";
  ctx.fillRect(paddle2.xpos, paddle2.ypos, paddle2.width, paddle2.height);
  if (!req) {
    requestAnimationFrame(paddleloop);
  }
}
function ballmovement() {
  ctx.clearRect(ball.xpos, ball.ypos, ball.width, ball.height);
  if (ball.ypos <= 0) {
    ball.ypos = 0;
    ball.yspeed = -ball.yspeed;
  }
  if (ball.ypos + ball.height >= 625) {
    ball.ypos = 625 - ball.height;
    ball.yspeed = -ball.yspeed;
  }
  if (
    ball.xpos <= paddle1.width &&
    ball.ypos + ball.height >= paddle1.ypos &&
    ball.ypos <= paddle1.ypos + paddle1.height &&
    ball.xpos > 0
  ) {
    ball.xspeed = -ball.xspeed;
    ball.xpos = paddle1.width;
  }
  if (
    ball.xpos + ball.width >= 625 - paddle2.width &&
    ball.ypos + ball.height >= paddle2.ypos &&
    ball.ypos <= paddle2.ypos + paddle2.height &&
    ball.xpos + ball.width < 625
  ) {
    ball.xspeed = -ball.xspeed;
    ball.xpos = 625 - paddle2.width - ball.width;
  }
  if (ball.xpos <= 0 || ball.xpos + ball.width >= 625) {
    if (ball.xpos <= 0) {
      inster.innerHTML = "winner:right";
    } else {
      inster.innerHTML = "winner:left";
    }
    req = true;
  }
  ball.xpos += ball.xspeed;
  ball.ypos += ball.yspeed;
  ctx.fillRect(ball.xpos, ball.ypos, ball.width, ball.height);
  if (!req) {
    requestAnimationFrame(ballmovement);
  }
}
paddleloop();
ballmovement();
window.addEventListener("keydown", move);
window.addEventListener("keyup", move);
