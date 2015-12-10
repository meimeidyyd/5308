//------------------------- Set Links-------------------------
function link(A, B) 
{
    this.nodeA = A;
    this.nodeB = B;
    this.strokeStyle = "red";
    this.width = 3;
    this.draw = function () 
    {
        context.beginPath();
        context.moveTo(this.nodeA.x, this.nodeA.y);
        context.lineTo(this.nodeB.x, this.nodeB.y);
        context.strokeStyle = this.strokeStyle;
        context.lineWidth = this.width;
        context.stroke();
        context.closePath();
    }
}


function setLinks() 
{
    for (var i = 0; i < n; i++) 
    {
        links[i] = new link(nodes[i], nodes[(i + 1) % n]);
        linkStates[i] = 0;
    }
    resetLinkStates();
}

function resetLinkStates()
{
    linkStates = [];
    for (var i = 0; i < n; i++) 
    {
        linkStates[i] = 0;
        links[i].strokeStyle = "red";
    }
    
}


function checkLastLink(a)
{
    var checkLinks = getLinks(a);
    var linkBackward = checkLinks[1];
    var backward = linkStates[linkBackward];
    if (backward === 1 && a.state > 1)
    {
        links[linkBackward].strokeStyle = "#00ff00";
        linkStates[linkBackward] = 2;
    }
}


function getLinks(a)
{
    var linkForward, linkBackward;
    if (a.direction == 1)
    {
        linkForward  = a.next;
        linkBackward = (!a.next) ? n - 1 : a.next - 1;
    }else{
        linkForward  = (!a.next) ? n - 1 : a.next - 1;
        linkBackward = a.next;
    }
    return [linkForward, linkBackward];
}


function getSegmentSize()
{
    var a = k - 2;
    var sizeOfS = [];
    var s = 0;
    var u = unexplored;
    
    
    if (algorithm === '1')
    {
        s = Math.floor((unexplored + 1 )/ 2);
        u -= s;
        sizeOfS.push(s);
        sizeOfS.push(u);
    }
    // if number of agents alive > size of unexplored area, some of agents will not move 
    else if (a > u){
        for (var i = 0; i < a; i++)
        {
            s = i < u ? 1 : 0;
            sizeOfS.push(s);    
        }
    }else
    {
    // devide into segements of almost equal size
        for (var i = 0; i < a; i++)
        {
            s = Math.floor(u / (a - i));
            u -= s;
            sizeOfS.push(s)
        }
        
    }
    return sizeOfS;
}


function getSegments(left)
{
    var sizeOfS = getSegmentSize();
    S = [];
    var a = k - 2;
    if (algorithm === '1')
    {
        a = 2;
    }
    var l,r;
    consoleCount++;
    for (var i = 0; i < a; i++)
    { 
        if (i)
        {
            l = S[i - 1][1] + 1; 
            r = S[i - 1][1] + sizeOfS[i];
        }else{
            l = left + 1;
            r = left + sizeOfS[0];
        }
        S.push([l,r])
        if (sizeOfS[i])
        {
            var s = '{ ';
            for (var j = l; j < r; j++)
            {
                s += j + ', '
            }
            s += r + ' } \n';
            if (algorithm === '3')
            {
                var id = i + 3;
                if (!i) $('#conArea').append(consoleCount+')\n');
                $('#conArea').append('Agent ' + id + ' checks S' + id + ' = ' + s );
            }else{
                var id = i ? 'U left' : consoleCount+')\n'  + 'U right';
                $('#conArea').append(id + ' = ' + s );
            }
        }
    }
    for (var i = 0; i < a; i++)
    { 
        S[i][0]--;
        S[i][1]++;
        if(S[i][1] === n)
        {
            S[i][1] = 0;
        }
        if (!sizeOfS[i])
        {
            S[i][0] = -1;
        }
    }
}


function initSegments(){
    var u=[];
    var e=[0];
    for(var i=1;i<=n-1;i++){
        u.push(i);
    }
    U.push(u);
    //EX.push(e);
    

}

function divideSegments(alive,u){
   
    S=[];//初始化
    if(!consoleCount)$('#conArea').append((consoleCount++)+')\n');
    var currentUnexploredSize=u.length;
    var offset=Math.floor(currentUnexploredSize/alive);

    for(var i=0;i<alive-1;i++){
        S.push([offset*i,offset*(i+1)-1]);
        $('#conArea').append( printf('Agent: %2d ',i+1)+'U={'+ u.slice(offset*i,offset*(i+1)).toString()+'}\n'  );
    }
    //最后一个分段，如果被整除，最后一个应该是offset*alive-1
    //如果不能被整除应该是offset*alive-1+1
    S.push([offset*(alive-1),offset*alive==currentUnexploredSize ? offset*alive-1 : offset*alive]);
   
    $('#conArea').append( printf('Agent: %2d ',alive)+'U={'+ u.slice(offset*(alive-1),currentUnexploredSize).toString()+'}\n'  );

}
