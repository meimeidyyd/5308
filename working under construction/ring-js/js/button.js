$(document).ready(function () { 
    var graph = new Graph();
    
    
    $('#butGenerate').click(function () {
        check(0, graph);
    });
    
    $('#butBest').click(function () {
        check(1, graph);
    });
    
    $('#butWorst').click(function () {
        check(2, graph);
    });
    
    $('#sizeBar').change(function() {
        resize(graph);
    });
    
    $('#start').click(function () {
        if (!$('#svg').length)
        {
            confirm("Please generate a ring network first!");
            return;
        }
        if ($('#start').text() == 'Stop')
        {
            $('#start').text('Start');
        }
        else{
            //show(graph);
            $('#start').text('Stop');
            initial(graph);
        }
    });
    
    
    $('.buttons').mouseenter(function () {
        $(this).fadeTo('fast', 0.8);
    });

    $('.buttons').mouseleave(function () {
        $(this).fadeTo('fast', 1);
    });
    
});



function check(c, graph)
{
    var n = $('#numNodes').val();
    var reg= /^[0-9]*$/;
    // check if the value is a number in [1,100]
    if(!reg.test(n) || n < 2 || n > 100) 
    {
        confirm("Please input an integer between 2 and 100.");
    }else 
    {
        $('svg').remove();
        graph.empty();
        $('#start').text('Start');
        graph.drawGraph(n, c);
    }
};

function bestCase(n)
{
    var name = [];
    var i = 0;
    while(n - i)
    {
        name[i] = i + 1;
        i++;
    }
    return name;
};


function getRandomNames(n)
{
    var name = bestCase(n);
    var a;
    var b;                    
    while (n)
    {
        a = n-1;
        b = Math.floor(Math.random() * n);
        n--;
        if (a == b)
        { 
            continue;
        }
        name[a] ^= name[b];
        name[b] ^= name[a];
        name[a] ^= name[b];
    }
    return name;
};


function addSvg(){
    var svg = d3.select("#graph").append("svg")
            .attr("width", 720)
            .attr("height", 600)
    // id is used to check if there is a graph
            .attr("id", "svg");
    return svg;
};


function resize(g)
{
    if (g.n)
    {
        $('svg').remove();
        $('#start').text('Start');g
        g.empty();
        g.drawGraph(g.n, 3);
    }
}

function show(g)
{
    var n = g.nodes.length;
    var x, y;
    for(var i = 0; i < n; i++)
    {
        x = g.nodes[i].x;
        y = g.nodes[i].y;
	}
};

function initial(g)
{	
      for(var i = 0; i < g.n; i++)
      {
          g.nodes[i].init();                 
	  }
};

