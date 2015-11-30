//------------------------- Set Nodes-------------------------
function node(p, r) 
{
    this.x      = p.x;
    this.y      = p.y;
    this.radius = r;
    this.fillStyle = "#eeeeee";
    this.mark   =[];
    this.draw = function () 
    {
        context.fillStyle = "#000000";
        context.beginPath();
        context.arc(this.x, this.y, this.radius + 2,  0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
        
        context.fillStyle = this.fillStyle;
        context.beginPath();
        context.arc(this.x, this.y, this.radius,  0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }
}


function setNodes() 
{
    // set (x,y) as the center of the graph
    var x          = 425;
    var y          = 310;
    // set the size of the graph
    var size       = 130 + 1.5 * $('#size').val();
    var r          = 20 + size / 40 -  Math.floor(n / 6);
    // a is to tranform the graph to fit the suitable height and width 
    var a           = x / y;
    for(var i = 0; i < n; i++)
    {
        var angle = i * 2 * Math.PI / n - Math.PI / 2;
        var v =  [];
        v['x'] =  x + a * size * Math.cos(angle);
        v['y'] =  y + size * Math.sin(angle);
        nodes.push(new node(v, r));
    }
}

var nodeV = { id : 0, pos : 0, left : 0, right : 0};

function resetNodeV()
{
    nodeV = { id : 0, pos : 0, left : 0, right : 0};
}


function whiteBoard(id, pos, left, right)
{
    nodeV.id = id;
    nodeV.pos = pos;
    nodeV.left = left;
    nodeV.right = right;
    console(id, 3);
}