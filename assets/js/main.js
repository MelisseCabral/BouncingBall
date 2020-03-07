var canvas;
var canvasContext;
var framesPerSecond = 30;

var width = 800;
var height = 600;

/* 
pega a largura da resolução da tela
    var width = screen.width * 0.85;
    var height = screen.height * 0.85;
*/


let ball = {
    x: 50,
    speedX: 7,
    y: 50,
    speedY: 3,
}

const PADDLE_HEIGHT = 100;
var paddle1Y = 250;
var paddle2Y = 250;

window.onload = function(){
    
    canvas = document.getElementById("gameCanvas");
    this.canvas.width = width;
    this.canvas.height = this.height;
    canvasContext = canvas.getContext('2d');

    canvas.addEventListener('mousemove', e => {
        var mousePos = calculateMousePosition(e);
        if(mousePos.x > 400){
            paddle2Y = mousePos.y - PADDLE_HEIGHT/2;
        } else {
            paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
        }
    });

    draw();
    this.setInterval(this.draw, 1000/this.framesPerSecond);

}

function draw () {
    increaseBallPosition();

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    colorRect(5, paddle1Y, 10, PADDLE_HEIGHT, 'white');
    colorRect(width - 15, paddle2Y, 10, PADDLE_HEIGHT, 'white');
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
    
    if(ball.x <= 15){
        if(ball.y > paddle1Y && ball.y < paddle1Y + PADDLE_HEIGHT){
            ball.speedX = - ball.speedX
            ball.speedY = - ball.speedY
        } 
         else {
            resetBall();
        } 
    }
    if(ball.x >= width){
        if(ball.y > paddle2Y && ball.y < paddle2Y + PADDLE_HEIGHT){
            ball.speedX = - ball.speedX
            ball.speedY = - ball.speedY
        } 
         else {
            resetBall();
        } 
    }
    if(ball.y <= 0){
        if(ball.y > paddle1Y && ball.y < paddle1Y + PADDLE_HEIGHT){
            ball.speedX = - ball.speedX
            
        } 
         else {
            resetBall();
        } 
    }
    if(ball.y >= height){
        if(ball.y > paddle2Y && ball.y < paddle2Y + PADDLE_HEIGHT){
            ball.speedX = - ball.speedX
        } 
         else {
            resetBall();
        } 
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

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
}