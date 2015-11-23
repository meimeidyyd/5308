//------------------------- Set Links-------------------------
function link(A, B) 
{
    this.nodeA = A;
    this.nodeB = B;
    this.strokeStyle = "#222222";
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
        links[i].strokeStyle = "#222222";
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
    // if number of agents alive > size of unexplored area, some of agents will not move 
    if (a > unexplored){
        for (var i = 0; i < a; i++)
        {
            s = i < unexplored ? 1 : 0;
            sizeOfS.push(s)    
        }
    }else
    {
    // devide into segements of almost equal size
        for (var i = 0; i < a; i++)
        {
            s = Math.floor(unexplored / (a - i));
            unexplored -= s;
            sizeOfS.push(s)
        }
    }
    return sizeOfS;
}


function getSegments()
{
    var sizeOfS = getSegmentSize();
    S = [];
    var a = k - 2;
    var l,r;
    for (var i = 0; i < a; i++)
    { 
        if (!sizeOfS[i])
        {
            break;
        }
        if (i)
        {
            l = S[i - 1][1] + 1; 
            r = S[i - 1][1] + sizeOfS[i];
        }else{
            r = left + sizeOfS[0];
            l = left + 1;
        }
        S.push([l,r])
    }
    for (var i = 0; i < S.length; i++)
    { 
        S[i][0]--;
        S[i][1]++;
        if(S[i][1] === n)
        {
            S[i][1] = 0;
        }
    }
}

