
var dx = 3;
var dy = 0.5;

var dx2 = 3;
var dy2 = 0.5;
function Message() {
    this.x = 0;
    this.y = 0;
    this.radius = 8;
    this.fillStyle = "#f85455";
    this.draw = function(cxt) {
        cxt.fillStyle = this.fillStyle;
        cxt.beginPath();
        cxt.arc(this.x, this.y, this.radius,  0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
    }
}

//var context = canvas.getContext("2d");
function drawFrame() {
 
    var timer = null;
    var delayTime = 1000 / 100;
///    var canvas = document.getElementById("canvas"),
 //   context = canvas.getContext("2d");
 //   context.clearRect(0, 0, 500, 600);
    timer = setTimeout(drawFrame, delayTime);
    // 停止循环
    if( m.x >= 600) {
        dx = -Math.floor(Math.random() * 40) / 10;
        
    }
    if( m.x <= 0) {
        dx = Math.floor(Math.random() * 40) / 10;
        
    }
    if( m.y >= 500) {
        dy = -Math.floor(Math.random() * 20) / 10;
        
    }
    if( m.y <= 0) {
        dy = Math.floor(Math.random() * 20) / 10;
        
    }
    if( m2.x >= 600) {
        dx2 = -Math.floor(Math.random() * 40) / 10;
        
    }
    if( m2.x <= 0) {
        dx2 = Math.floor(Math.random() * 40) / 10;
        
    }
    if( m2.y >= 500) {
        dy2 = -Math.floor(Math.random() * 20) / 10;
        
    }
    if( m2.y <= 0) {
        dy2 = Math.floor(Math.random() * 20) / 10;
        
    }
    m.x += dx;
    m.y += dy;
    m2.x += dx2;
    m2.y += dy2;
    m.draw(context);
    m2.draw(context);
}


drawFrame();