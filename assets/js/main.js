var canvas;
var canvasContext;
var framesPerSecond = 30;

var width = 800;
var height = 600;

/* 
Get resolution of screen and setting size of canvas
    var width = screen.width * 0.85;
    var height = screen.height * 0.85;
*/


let ball = {
    x: 400,
    speedX: 10,
    y: 300,
    speedY: 4,
}

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
var paddle1Y = 250;
var paddle2Y = 250;

window.onload = function(){
    overlayOn();
}

function startNewGame(){

    overlayOff();

    canvas = document.getElementById("gameCanvas");
    this.canvas.width = width;
    this.canvas.height = this.height;
    canvasContext = canvas.getContext('2d');

    canvas.addEventListener('mousemove', e => {
        var mousePos = calculateMousePosition(e);
        if(mousePos.y >= 0){
            paddle2Y = mousePos.y;
        } else{
            paddle2Y = 0;
        }
        
    });

    draw();
    this.setInterval(this.draw, 1000/this.framesPerSecond);
    
}

function draw () {
    increaseBallPosition();

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    colorRect(5, paddle1Y, 10, PADDLE_HEIGHT, 'white');
    colorRect(width - PADDLE_WIDTH - 5, paddle2Y, 10, PADDLE_HEIGHT, 'white');
    colorArc(ball.x, ball.y, 10, 0, 'green')
    
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle =  drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
function colorArc(leftX, topY, radius){
    canvasContext.beginPath();
    canvasContext.arc(leftX, topY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function increaseBallPosition(x, y){
    
    let limitX = canvas.width - 10;
    let limitY = canvas.height - 10;

    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;

    computerMove();
    
    if(ball.x <= 20){
        if(ball.y > paddle1Y && ball.y < paddle1Y + PADDLE_HEIGHT){
            ball.speedX = - ball.speedX;
        } 
         else {
            resetGame();
        } 
    }
    if(ball.x >= width - 20){
        if(ball.y > paddle2Y && ball.y < paddle2Y + PADDLE_HEIGHT){
            ball.speedX = - ball.speedX;
        } 
         else {
            resetGame();
        } 
    }
    if(ball.y <= 0){
        ball.speedY = - ball.speedY 
    }
    if(ball.y >= height){
        ball.speedY = - ball.speedY
    }
    
}

function calculateMousePosition(evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    return {
        x: evt.clientX - rect.left - root.scrollLeft,
        y: evt.clientY - rect.top - root.scrollTop
    }
}

function computerMove(){
    var paddle1YCenter = paddle1Y + (PADDLE_HEIGHT)
    if(paddle1YCenter < ball.y){
        paddle1Y +=6;
    } if (paddle1Y > ball.y){
        paddle1Y -= 6;
        
    }
}

function resetBall(){
    /*
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    */
    ball = {
        x: 100,
        speedX: 10,
        y: 100,
        speedY: 4,
    }
}

function resetGame(){
    resetBall();
}

function overlayOn(){
    document.getElementById("overlay").style.display = "flex";
}
function overlayOff(){
    document.getElementById("overlay").style.display = "none";
}