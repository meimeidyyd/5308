//------------------------- Set Agents-------------------------
function Agent(p, Id, d) 
{
    this.x          = p.x;
    this.y          = p.y;
    this.id         = Id;
    this.radius     = n ? nodes[0].radius - 3 : 0;
    this.next       = 0;
    this.goal       = 0;
    this.stage      = 1;
    this.direction  = d;
    this.fillStyle  = "#0044ff";
    this.terminate  = false;
    this.vanish     = false;
    /*  1.Devide:    state: 0 : init, 1 : explore, 2 : return ,3 : go to v
        4.Pairing:   state: 0 : init, 1 : explore, 2 : return ,3 : chase, 5 : become paired-left or alone
        6.Gathering: state: 0 : init, 1 : explore, 2 : return ,3 : chase, 4 : stay and check
    
    */
    this.state      = 0;
    this.report     = false;
    
    
    this.draw = function () 
    {
        context.fillStyle = this.fillStyle;
        context.beginPath();
        context.arc(this.x, this.y, this.radius,  0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }

    this.doAlgorithm = function ()
    {
        var a = agents[this.id - 1];
        if (this.vanish)
        {
            return;   
        }else if (this.report && !this.next)
        {
            checkLastLink(a);
            this.terminate = true;
            console(this.id, 2);
            done++;
            return;
        } 
        switch (algorithm)
        {
        //  algorithm Devide
        case "1":
                Devide(a);
                break;
                
        //  algorithm OptTime
        case "2":
                OptTime(a);
                break;         
        case "3":
                TradeOff(a);
                break;
            
        case "4":
                Pairing(a);
                break;
        
        case "5":
                Elimination(a);
                break;
            
        case "6":
                Gathering(a);
                break;
            
        case "7":
                Bod(a);
        }
        
    }
    
    this.move = function () 
    {
        this.doAlgorithm();
        // it stays
        if (this.state > 3)
        {
            positionChange[this.id - 1] = [0, 0];
            return;
        }
        
        var current = this.next;
        var next    = current + this.direction;
        
        if (next < 0)
        {
            this.next = n - 1;        
        }else if (next > n - 1)
        {
            this.next = 0;        
        }else{
            this.next = next;
        }
        var p = moveAB(nodes[current], nodes[this.next]);
        positionChange[this.id - 1] = p;
    }
    
    // return 0 - n-1 if it meets a node, otherwise it returns -1
    this.collision = function() 
    {
        var p = nodes[this.next];
        if (Math.abs(p.x - this.x) < 0.1  &&  Math.abs(p.y - this.y)< 0.1) 
        {
            if (this.next === blackHole)
            {
                this.radius = 0;
                this.vanish = true;
                if (algorithm != '3')
                {
                    done++;
                }
            }
            this.x = p.x;
            this.y = p.y;
            return 1;
        }
        return 0;
    }
    
}


//  update the position of every agent
function moveAgents()
{
    if (!agents.length)
    {
        return;
    }
    // draw agents with text
    context.font = nodes[0].radius + "px Arial";
    for (var i = 0; i < agents.length; i++) 
    {
        var ai = agents[i];
        if (ai.vanish)
        {
            continue;        
        }
        if (!ai.terminate)
        {
            var p  = positionChange[i];
            agents[i].x += p[0];
            agents[i].y += p[1];
        }
        //  draw agents 
        agents[i].draw(context);
        // set the text at the center of the nodes
        var x = ai.x - (ai.id > 9 ? ai.radius / 1.8 : ai.radius / 3.6);
        var y = ai.y + ai.radius / 3;
        // set black hole node text with different color
        context.fillStyle = "#ffffff";
        context.fillText(i + 1, x, y);
    }
}


function drawAgents()
{
    // draw agents with text
    context.font = nodes[0].radius + "px Arial";
    for (var i = 0; i < agents.length; i++) 
    {
        var ai = agents[i];
        //  draw agents 
        agents[i].draw(context);
        // set the text at the center of the nodes
        var x = ai.x - (ai.id > 9 ? ai.radius / 1.8 : ai.radius / 3.6);
        var y = ai.y + ai.radius / 3;
        // set black hole node text with different color
        context.fillStyle = "#ffffff";
        context.fillText(i + 1, x, y);
    }
}


function checkCollision() 
{
    for (var i = 0; i < agents.length; i++) 
    {
        // If the agent vanishes or terminates.do not check
        if (agents[i].vanish || agents[i].terminate)
        {
            continue;        
        }
        // if there is a collision
        if (agents[i].collision())
        {
            agents[i].move();
        }
    }
    
}

function randomAgents()
{   
    bases = [];
    var a, b, i = 0, c = n; 
    var r = [];
    while(i < c)
    {
        r[i] = i;
        i++;
    }
    // generate a ramdom array       
    while (c)
    {
        a = c-1;
        b = Math.floor(Math.random() * c);
        c--;
        if (a == b)
        { 
            continue;
        }
        r[a] ^= r[b];
        r[b] ^= r[a];
        r[a] ^= r[b];
    }
    
    for (i = 0, c = -1; i < k; )
    {
        c++;
        if(r[c] === blackHole)
        {
            continue;
        }
        bases.push(r[c]);
        i++;
    }
}

