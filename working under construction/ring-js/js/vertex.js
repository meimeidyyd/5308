function Vertex(n, x, y) {
    var Id = n;
	this.x = x;
	this.y = y;
    this.No = 0;
    this.state = 'Sleeping';  
    
    this.setId = function (id){
        Id = id;
        return;
    }
    
    this.getId = function (){
        return Id;
    }
}

Vertex.prototype.init = function() {
    var id = this.getId();
    var time = Math.floor(Math.random() * 10000);
    setTimeout(function () {
        

        $('#' + id).css("stroke","#F00");
        
        
    },time);
    $('#area').append(this.getId() + 'will become initiator in ' + time / 1000 + 'seconds\n');    
}



Vertex.prototype.sendId = function() {
    
    
    //var next = (this.No + 1) % g.nodes.length;
   // var A = g.nodes[next];
   // var link = [A.x - this.x, A.y - this.y];
    //var id = '#' + this.Id;
    //var time = Math.floor(Math.random() * 10000);
    //setTimeout(function () {
     //   $(id).css("stroke","#F00")
    //},time);
       
}


Vertex.prototype.receive = function(A) {
    
    if (this.state === 'Sleeping')
    {
        // send its id to other first

        
    }else if (this.state === 'Passive')
    {
        // send message to other        
    }
        
    if (A.Id < this.Id)
    {
        // send message to other

    }else if(A.Id > this.Id)
    {
        // message received will not be sent

    }else
    {
        // this is the leader,it sends notification
        this.notify();
        this.state = 'Done';
    }
}

Vertex.prototype.notify = function() {
    return;
}


