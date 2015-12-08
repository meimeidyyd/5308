//-------------------------Generate agents-------------------------
function init()
{
    // reset agents and status
    n      = nodes.length;
    // U      = [];
    done   = 0;
    unexplored  = n - 1;
    consoleCount  = 0;
    gatherCount = 0;
    E      = [[0, 0], [0, 0]];
    resetNodeV();
    disableButtons();
    resetLinkStates();
    agents = [];
    moves=0;
    idealtime=0;
    
    // call function generate agents in specific algorithm
    switch (algorithm) 
    {      
        case "1":
            initDivide();
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


// function initDivide()
// {
//     k = 2;
//     var right = Math.floor(n / 2);
//     var left  = right + 1;
//     var max = n - 1;
//     nodeV.left = left;
//     nodeV.right = right;
//     getSegments(0);
//     for (var i = 0; i < k; i++) 
//     {
//         var a = new Agent(nodes[0], i + 1, i ? 1 : -1);
//         a.goal = i ? right : left;
//         agents.push(a);
//         agents[i].move();
//     }
// }

function initDivide()
{
    k = 2;
    // var right = Math.floor(n / 2);
    // var left  = right + 1;
    // var max = n - 1;
    // nodeV.left = left;
    // nodeV.right = right;
    // getSegments(0);
    initSegments();
    divideSegments(k,U[0]);
    for (var i = 0; i < k; i++) 
    {
        var a = new Agent(nodes[0], i + 1, i ? -1 : 1);
        a.goal = a.direction>0 ? U[0][S[0][1]] : U[0][S[1][0]];
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
    getSegments(0);
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
    bases=[2,13,9,22,21,15,3,0,19,20,6,18,17,7,4,12,10,14,16,5];
    for (var i = 0; i < k; i++) 
    {
        var agent = new Agent(nodes[bases[i]], i + 1, 1);
        agent.next = bases[i];
        agent.goal = -1;
        agent.state=0;
        agents.push(agent);
        agents[i].move();
    }
    //drawAgents();  
    
}


function initElimination()
{
   
    for(var i=0;i<=k;i++){
        if(agents[i].state==-5){
            
            agents[i].terminate=false;
            agents[i].direction=1;
            agents[i].goal=(agents[i].next+(Math.floor((n-1)/2)))%n;
            bases[i]=agents[i].next;
            pairedBasesRound.push(1);
            pairedBases.push(agents[i].next);
            
            
            if(!agents[agents[i].chasing].vanish){
                //temp[3]=agents[i].chasing+1;
                agents[agents[i].chasing].terminate=false;
                
                
                agents[agents[i].chasing].goal=Math.abs(agents[i].next-(Math.floor((n-1)/2)))%n;
                bases[agents[i].chasing]=agents[i].next;
                agents[agents[i].chasing].move();
            }
            agents[i].move();
        }
    }



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
