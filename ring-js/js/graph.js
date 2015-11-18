function Graph()
{
    // record all the nodes' positions and ids in the graph
	this.nodes      = [];
    // record all the links' positions in the graph
    this.links      = [];
    this.names      = [];
    // to send messages
    this.n          = 0;
    
};

Graph.prototype.drawGraph = function (n, c)
{	
	//this.nodes   = [];
    this.n          = n;
    // set the width and height of the 
    var width       = 720,
        height      = 600;
    // set (x0,y0) as the center of the graph
    var x0          = width / 2;
    var y0          = height / 2;
    // to simplify the calculation
    var pin         = 3.14159265 / n;
    // set the size of the graph
    var size        = 150 + 1.5 * $('#sizeBar').val();
    // a is to tranform the graph to fit the suitable height and width 
    var a           = width / height;
    // radius of the nodes and the graph keeps changing 
    // according to the number of the nodes
    var rad         = size / (1 + 1.2 / Math.sin(pin));
    var R           = rad * 1.2 / Math.sin(pin);
    // set the maximum radius
    rad = rad > 15 ? 15 : rad;
    
    this.setNode(n,x0,y0,R,c);
    this.setLink(n,x0,y0,R);
    
    var svg = addSvg();
    this.drawLink(svg);
    this.drawNode(svg, rad);

};


Graph.prototype.setLink = function (n,x,y,R)
{	
    var a = x / y;
    // to simplify the calculation
    var pin = 3.14159265 / n;
    
	for(var i = 0; i < n; i++){
        var ai = i * 2 * pin -  pin;
        var j  = (i != n - 1) ? i + 1 : 0;
        var aj = j * 2 * pin -  pin;
    //    for(var j = i + 1; j < n; j++){
    //        var aj = j * 2 * pin -  pin;
        var l       = [];
        l['x1']     = x + a * R * Math.cos(ai);
        l['y1']     = y + R * Math.sin(ai);
        l['x2']     = x + a * R * Math.cos(aj);
        l['y2']     = y + R * Math.sin(aj);
        this.links.push(l);
   //     }
	}
};


Graph.prototype.drawLink = function (svg)
{	
	var link = svg.selectAll(".link")
                  .data(this.links)
                  .enter()
                  .append("line")
                  .attr("class", "link")
                  .attr("x1", function(d) { return d.x1; })
			      .attr("y1", function(d) { return d.y1; })
			      .attr("x2", function(d) { return d.x2; })
			      .attr("y2", function(d) { return d.y2; });
};


Graph.prototype.setNode = function (n, x, y, R, c)
{
    var a = x / y;
    // to simplify the calculation
    var pin = 3.14159265 / n;
    var names = [];
    // use functions to name the nodes
    switch (c)
    {
    case 1:
            names = bestCase(n);
            break;
    case 0:
            names = getRandomNames(n);
            break;
    default:
            names = this.names;
    }
    this.names = names;
    // give names for and set position of all the nodes
    for(var i = 0; i < n; i++){
        var angle = i * 2 * pin -  pin;
        var v =  new Vertex(names[i], 
                            x + a * R * Math.cos(angle), 
                            y + R * Math.sin(angle));
        
        
        v.No = i;
		this.nodes.push(v);
	}
};


Graph.prototype.drawNode = function (svg, rad)
{	
	var node = svg.selectAll("g.node")
                  .data(this.nodes)
                  .enter().append("svg:g")
                  .attr("transform", function(d) { return "translate(" + d.x + ","+ d.y + ")"; });

    node.append("svg:circle")
        .attr("class", "node")
        .attr("r", rad)
        .attr("id", function(d) { return d.getId(); });

    node.append("svg:text")
        .attr("class", "nodeText")
        .style("font-size", rad)
        .text(function(d) { return d.getId(); })
        .attr("transform", function(d) { return "translate(" + -  rad / 4 * ((d.getId() > 9) ? 2 : 1) + "," +  rad / 4  + ")"; });
    
    node.exit().remove();
};


Graph.prototype.empty = function (num)
{	
    // to remove everything in the graph
	this.nodes = [];
	this.links = [];
};