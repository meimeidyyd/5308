Vertex.prototype.init = function() {
    time = Math.floor(Math.random() * 10000);
    setTimeout(
        this.initiator,time);
    $('#area').append(this.Id + 'will become initiator in ' + time / 1000 + 'seconds\n');    
}



Vertex.prototype.initiator = function() {
    var id = '#' + this.Id;
    $(id).css("stroke","#F00");
}


this.setId = function (id){
        Id = id;
        return;
    }
    
    this.getId = function (){
        return Id;
    }
    
        var Id = n;