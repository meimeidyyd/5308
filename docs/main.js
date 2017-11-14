// draw the ring network with a base and a black hole
function drawGraph(type)
{
    // when type > 0, draw a new graph
    if (type)
    {
        empty();
        setNodes();
        setLinks();
        switch (type)
        {
        case 1:

                break;
        // generate a random blackHole which is not the base
        case 2:
                blackHole = Math.floor(Math.random() * (n - 1)) + 1;
                break;
        }
        nodes[blackHole].fillStyle = '#000000';
        if (algorithm != 6)
        {
            nodes[base].fillStyle = 'orange';
        }
    }

    // draw links first
    for (var i = 0; i < links.length; i++)
    {
        links[i].draw();
    }


    for (var i = 0; i < nodes.length; i++)
    {
        //  draw vertices
        nodes[i].draw(context);
    }

    // set the text at the center of the nodes
    if  (addLabels)
    {
        // draw nodes with text
        context.font = nodes[0].radius + "px Arial";
        for (var i = 0; i < nodes.length; i++)
        {
            var ni = nodes[i];
            var x = ni.x - (i > 9 ? ni.radius / 1.8 : ni.radius / 3.6);
            var y = ni.y + ni.radius / 3;
            // set black hole node text with different color
            context.fillStyle = (i === blackHole) ? "#ffffff" : "#000000";
            context.fillText(i, x, y);
        }
    }
}


// check if the input value is valid
function checkN()
{
    var num = $('#n').val();
    var reg= /^[0-9]*$/;
    // check if the value is a number in [3,100]
    if(!reg.test(num) || num < 3 || num > 100)
    {
        confirm("Please input an integer between 3 and 100.");
    }else
    {
        n = num;
        drawGraph(2);
    }
};


// get a random agent number k that k >= a
function setK(a)
{
    if(k>=a&&k<=n-1)return;
    if (!k || k < a)
    {
        k = parseInt($('#k').val());
    }
    if (k > n - 1)
    {
        k = Math.floor(Math.random() * (n - 2));
    }
    k = (k < a) ? a : k;
    $('#k').val(k);
    randomAgents();
};


// check if the agent number is valid
function checkK()
{
    var num = $('#k').val();
    var reg= /^[0-9]*$/;
    // check if the value is a number in [3,100]
    if(!reg.test(num) || num < 2 || num > n - 1)
    {
        confirm("Agent number k should be between 2 and n - 1.");
    }else
    {
        if (algorithm == '1'){
            k = 2;
            baseAgents();
            return;
        }else if (algorithm == '2'){
            k = n - 1;
            baseAgents();
            return;
        }
        k = num;
        if (algorithm == '3'){
          if (k < 3) k = 4;
          if (n < 5){
            confirm('Number of nodes n must be at least 5.');
            return;
          }
          baseAgents();
        }else{
          randomAgents();
        }
    }
};



// change the speed of agents by changing the speed bar
function changeSpeed()
{
    var speed = Math.floor($('#speedBar').val()) / 20 + 0.25;
    speed = (speed > 5 ? 5 : speed) * ((speed > 2) + 1);
    $('#speedValue').text(speed);
    refreshRate = 60 * speed;
}


// compute the position change from A to B
function moveAB(A, B)
{
    // return position changes per frame when an agent moves from A to B
    return [(B.x - A.x) / speed, (B.y - A.y) / speed];
}



// refresh the position of agents in each frame
function refreshFrame ()
{
    if (done == k)
    {
        enableButtons();
        
        return;
    }
    if (stop)
    {
        enableButtons();
        return;
    }
    if( pause)
    {
        $('#start').text('Continue');
        return;
    }
    timer = setTimeout(refreshFrame, 1000 / refreshRate);
    context.clearRect(0, 0, 850, 620);
    checkCollision();
    drawGraph(0);
    moveAgents();
}


// reset the attributes of the graph
function empty()
{
    nodes       = [];
    links       = [];
    agents      = [];
    context.clearRect(0, 0, 850, 620);
    pause       = false;
    done        = 0;
}


function console(id, m)
{
    var message = 0;
    consoleCount++;
    switch (m)
    {
        case 1:
            message = 'Agent ' + id +' discovers the black hole';
            break;
        case 2:
            message = 'Agent ' + id +' reports to the base that the black hole is at node ' + blackHole + ' (algorithm terminates)';
            break;
        case 3:
            message = 'Agent ' + id.id +' writes on the white board of node ' + id.next;
            break;
        case 4:
            message = 'K - 1 agents are gathering at node ' + id + '.\nAlgorithm Gathering terminates';
            break;
        case 5:
            message = 'Agent ' + id +' reads messages from the white board of node ' + nodeV.pos;
            break;
        case 6:
            message = 'Agent ' + id.id +' notifies other nodes at ' + id.next + ' to start the new round';
            break;
        case 7:
            message = 'Agent ' + id +' terminates with status alone.Visited by '+chasedAgent.toString();
            break;
        case 8:
            message = 'Agent ' + id +' leaves a mark Join me and terminates with status paired-left';
            // ,lastSafeNodeForChasedAgent'+chasedAgent[0]+':'+lastVisited[chasedAgent[0]-1];
            break;
        case 9:
            message = 'Agent ' + id +' clears the mark and terminates with status paired-right and paired with '+chasedAgent.toString();
            break;
        case 10:
            message = 'Agent ' + id.id +' begin to chase agent '+(id.chasing+1);
            // +' lastSafeNodeForChasedAgent '+lastVisited[id.chasing];
            break;
    }
    $('#conArea').append((consoleCount) + ')\n' + message + '.\n');
}

 function printf(){
     var as=[].slice.call(arguments),fmt=as.shift(),i=0;
    return fmt.replace(/%(\w)?(\d)?([dfsx])/ig,function(_,a,b,c){
          var s=b?new Array(b-0+1).join(a||''):'';
          if(c=='d') s+=parseInt(as[i++]);
          return b?s.slice(b*-1).toString():s.toString();
     })
}
