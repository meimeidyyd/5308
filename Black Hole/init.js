//-------------------------Generate agents-------------------------
function init()
{
    // reset agents and status
    n      = nodes.length;
    U      = [];
    done   = 0;
    consoleCount  = 0;
    gatherCount = 0;
    E      = [[0, 0], [0, 0]];
    resetNodeV();
    disableButtons();
    resetLinkStates();
    agents = [];
    
    // call function generate agents in specific algorithm
    switch (algorithm) 
    {      
        case "1":
            initDevide();
            break;
            
        case "2":
            initOptTime();
            break;
            
        case "3":
            setK(4);
            initTradeOff();
            break;
            
        case "4":
            setK(3);
            initPairing();
            break;
        
        case "5":
            initElimination();
            break;
            
        case "6":
            setK(2);
            initGathering();
            break;
            
        case "7":
            initBod();
    }
    $('#n').val(n);
    $('#k').val(k);
    refreshFrame();
}


function initDevide()
{
    k = 2;
    var right = Math.floor(n / 2);
    var left  = right + 1;
    var max = n - 1;
    nodeV.left = left;
    nodeV.right = right;
    console('U1 left =' + left +'...' + max + '  ,  U1 right = 1...' + right, 6);
    for (var i = 0; i < k; i++) 
    {
        var a = new Agent(nodes[0], i + 1, i ? 1 : -1);
        a.goal = i ? right : left;
        agents.push(a);
        agents[i].move();
    }
}

function initOptTime()
{
    k = n - 1;
    for (var i = 0; i < k; i++) 
    {
        var a = new Agent(nodes[0], i + 1, 1);
        a.goal = i;
        agents.push(a);
        agents[i].move();
    }
}


function initTradeOff()
{
    unexplored  = n - 1;
    left = 0;
    right = 0;
    getSegments();
    for (var i = 0; i < k; i++) 
    {
        var a = new Agent(nodes[0], i + 1, i ? 1 : -1);
        if (i < 2)
        {
            // exploring agents
            a.goal = -1;
            a.fillStyle ="#ff0000";
        }else{
            // other agents
            if(i - 2 < S.length)
            {
                a.goal = S[i - 2][0];
                a.state = 3;
            }else{
                a.state = 4;
            }
        }
        agents.push(a);
        agents[i].move();
    }
}

            
function initPairing()
{
    for (var i = 0; i < k; i++) 
    {
        var agent = new Agent(nodes[bases[i]], i + 1, 1);
        agent.next = bases[i];
        agent.goal = -1;
        agents.push(agent);
        agents[i].move();
    }
    drawAgents();  
}


function initElimination()
{


}



function initGathering()
{
    
    for (var i = 0; i < k; i++) 
    {
        var agent = new Agent(nodes[bases[i]], i + 1, 1);
        agent.next = bases[i];
        agent.goal = -1;
        agents.push(agent);
        agents[i].move();
    }
    drawAgents();  
}


function initBod()
{


}
