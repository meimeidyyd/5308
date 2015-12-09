//-------------------------Do Algorithms-------------------------
function Devide(a)
{
    if (cautiousWalk(a))
    {
        return;
    }
    
    var getlinks = getLinks(a);
    var linkForward = getlinks[0];
    var forward = linkStates[linkForward];
    // arrives at node v, start the next round
    if (forward != 2)
    {
        a.state = 1;
        a.stage++;
        a.direction = - a.direction;

        
        unexplored = (a.id === 2) ?  - nodeV.right + a.next - 1 : nodeV.left - a.next - 1;
        unexplored = unexplored < 0 ? unexplored + n :unexplored;

        getSegments((a.id === 2) ? nodeV.right: a.next);

        var left = (a.id === 2) ? nodeV.right + a.next : nodeV.left + a.next;
        //when nodeV is at homebase
        if (!a.next && a.id === 2)
        {
            left += n;    
        }

        left = Math.floor(left / 2) + 1;
        var right = left - 1;
        a.goal = left + 1 - a.id;
        
        E[a.id - 1][2 - a.id] = a.next; 
        whiteBoard(a.id, a.next, left, right);
        // check if the algorithm terminates
        if(E[a.id - 1][0] - 2 === E[a.id - 1][1] || E[a.id - 1][0] + n - 2 === E[a.id - 1][1])
        {
            a.report = true;
        }
    }

}


function OptTime(a) 
{
    if (a.goal === a.next)
    {
        a.direction = - a.direction;
        if (a.stage === 1)
        {
            // node i + 1 is -(n - i - 1) in the inverse direction      
            a.goal = (a.id + 1 ) % n;
            a.stage++;
        }else if (a.stage === 2)
        {
            a.report = true;
            a.goal = 0;
            if (a.next != blackHole)
            {
                console(a.id, 1);
            }
            if (!a.next)
            {
                console(a.id, 2);
                a.terminate = true;
                done++;
            }
        }
    }
}

function TradeOff(a)
{

    if (a.report && !a.next)
    {
        a.terminate = true;
        console(a.id, 2);
        done++;
        return;
    }
    
    // notify agents at the right side
    if (a.state === 4 && a.stage === 3)
    {
        notify(a, 0);
        a.direction = -a.direction;
        a.state = 3;
        a.stage++;
    // notify agents at the left side
    }else if(a.state === 4 && a.stage === 4)
    {
        notify(a, 1);
        a.goal  = S[a.id - 3][0];
        var goal = a.goal ? a.goal : n;
        a.state = 3;   
        a.stage = 1;
    } 
    
    if (a.goal === a.next && a.state === 3)
    {
        // have checked both sides,then move left notify other nodes
        if (a.stage === 2)
        {
            a.stage++;
            a.goal      = -1;
            var left    = S[a.id - 3][0];
            var right   = S[a.id - 3][1];
            if (a.next)
            {   
                right = a.next < right ? a.next : right;
            }
            // find the black hole
            if (left + 2 === right || left + 2 === n)
            {
                a.report = true;
                done = k - 1;
                a.goal = 0;
            }
            unexplored = right ? (right - left - 1) : (n - left - 1);
            getSegments(left);
        }
        // have checked the left side
        if (a.stage === 1 )
        {
            a.goal = S[a.id - 3][1];
            a.stage++;
            a.direction = - 1;
        }
        
    }
    if (a.id < 3)
    {
       cautiousWalk(a);
    }else{
       chase(a);
    }
}

            
function Pairing(a)
{
    if (chase(a))
    {
       cautiousWalk(a);
    }
}


function Elimination(a)
{


}



function Gathering(a)
{
    if (chase(a))
    {
       cautiousWalk(a);
    }
    
    if (a.state === 4)
    {
        if (gatherCount === k - 1)
        {
            console(a.next, 4);
            stop = true;
            gatherCount = 0;
        }
    }
}


function Bod(a)
{


}

function chase(a)
{
    // get link states
    var getlinks = getLinks(a);
    var linkForward = getlinks[0],
        linkBackward = getlinks[1];
    var forward = linkStates[linkForward],
        backward = linkStates[linkBackward];

    
    // find forward link becomes safe,then continue to chase
    if (a.state === 4 && forward === 2)
    {
        a.state = 3;
        if (algorithm === '6')
        {   
            gatherCount--;
        }
    }
    
    
    // find the node has been explored by other
    if (a.state === 1 && backward === 2 && forward)
    {
        a.state = 3;     
    }
    
    
    // stop chasing when the link is not safe 
    if (a.state === 3 && forward === 1)
    {
        if (algorithm === '3')
        {
            a.state = 4; 
        }
        // terminate and become paired-left or alone 
        else if (algorithm === '4')
        {
            a.terminate = true;
            done++;
        }
        else if (algorithm === '6')
        {   
            a.state = 4;
            gatherCount++;
        }
    }
    
    if (a.state > 2){
        return false;
    }
    return true;
    
}

function cautiousWalk(a)
{
    // get link states
    var getlinks = getLinks(a);
    var linkForward = getlinks[0],
        linkBackward = getlinks[1];
    var forward = linkStates[linkForward],
        backward = linkStates[linkBackward];
    
    
    // have not started / have not reach the goal 
    if (!a.state  || (a.next != a.goal && a.state === 1 && !forward && backward === 2))
    {
        a.state = 1;
        links[linkForward].width = 5;
        links[linkForward].strokeStyle = "#ffcc00";
        linkStates[linkForward] = 1;
        return true;
    }
    
    // make the explored link safe 
    if (backward === 1 && a.state > 1)
    {
        links[linkBackward].strokeStyle = "#00ff00";
        linkStates[linkBackward] = 2;
    }
    
    // check if the algorithm terminates
    if (algorithm === '1')
    {
        if (forward  && backward)
        { 
            // check if the algorithm terminates
            if (E[a.id - 1][0] - 2 === E[a.id - 1][1] || E[a.id - 1][0] + n - 2 === E[a.id - 1][1])
            {
                //a.state = 1;
                a.report = true;
            }
        }
        if (a.report && !a.next)
        {
            a.terminate = true;
            console(a.id, 2);
            done++;
        }
    }
    
    // when it is forwarding
    if (a.state === 1)
    {
        if (backward === 1)
        {
            a.state = 2;
        }
        
        if (algorithm === '1')
        {
            // complete my work this round
            if (a.next === a.goal)
            {
                a.state = 3;
                E[a.id - 1][a.id - 1] = a.next;
                // check if the algorithm terminates
                if(E[a.id - 1][0] - 2 === E[a.id - 1][1] || E[a.id - 1][0] + n - 2 === E[a.id - 1][1])
                {
                    a.report = true;
                }
                a.direction = - a.direction;
                return true;
            }
        }
        
        if (backward != 2)
        {
            a.direction = - a.direction;
        }
    }
    // return 
    else if (a.state === 2)
    {
        a.state = 1;
        a.direction = - a.direction;
        
        if (algorithm === '1')
        {
            // read message from the white board
            if (a.next === nodeV.pos && a.id === 3 - nodeV.id)
            {
                a.goal = (a.id === 1 ? nodeV.left : nodeV.right);
                console(a.id ,5)
                a.stage++;
            }
        }
    }else if (a.state === 3){
        return false;
    }
    return true;
}


function notify(a, t)
{
    for (var i = 2; i < k; i++) 
    {
        if (!t && i === a.id - 1)
        {
            continue;
        }
        if (agents[i].next === a.next && i - 2 < S.length)
        {
            var g = S[i - 2];
            if (g[0] != -1)
            {
                agents[i].goal = g[0];
                if (g[0] <= a.next && (g[1] >= a.next || g[1] === n ))
                {
                    agents[i].direction = -agents[i].direction;
                }else{
                    agents[i].direction = 1;
                }
                
            }
            agents[i].stage = 1;
            agents[i].state = 3;
        }
    }
    console(a, 6);
}