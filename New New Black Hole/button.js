<<<<<<< HEAD
$(document).ready(function () {

    drawGraph(1);

=======
$(document).ready(function () { 
    
    drawGraph(1);
    
>>>>>>> origin/master
    $('#draw').click(function () {
        checkN();
        enableButtons();
    });
<<<<<<< HEAD

=======
     
>>>>>>> origin/master
    $('#start').click(function () {
        if (!n)
        {
            return;
        }
        var start = $('#start');
        if (start.text() == 'Start')
        {
            init();
        }
        else if (start.text() == 'Pause')
        {
            pause = true;
            start.text('Continue');
        }else{
            pause = false;
            start.text('Pause');
            refreshFrame();
        }
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
    $('#stop').click(function () {
        enableButtons();
        drawGraph(1);
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
    $('#create').click(function () {
        enableButtons();
        drawGraph(1);
        checkK();
        initGathering();
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
    $('#random').click(function () {
        enableButtons();
        drawGraph(1);
        // get a valid number of k
        k = Math.floor(Math.random() * (n - 2));
        k = (k < 2) ? 2 : k;
        $('#k').val(k);
        // set random bases
        randomAgents();
        // generate agents
        initGathering();
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
    $('#size').change(function() {
        done = k;
        drawGraph(1);
    });
<<<<<<< HEAD

    $('#speedBar').change(function() {
        changeSpeed();
    });

=======
    
    $('#speedBar').change(function() {
        changeSpeed();
    });
    
>>>>>>> origin/master
    $('#addLabels').click(function() {
        addLabels = !addLabels;
        drawGraph(1);
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
    $('#selectAlgorithm').change(function() {
        algorithm = $(this).val();
        if(algorithm=='5')return;
        k = 0;
        enableButtons();
        drawGraph(1);
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
    $('.buttons').mouseenter(function () {
        $(this).fadeTo('fast', 0.6);
    });

    $('.buttons').mouseleave(function () {
        $(this).fadeTo('fast', 1);
    });
<<<<<<< HEAD

=======
    
>>>>>>> origin/master
});


function disableButtons()
{
    pause  = false;
    stop = false;
    $('#start').text('Pause');
<<<<<<< HEAD
    $('#moves').text('');
  //$('#idealtime').val('');
  //  $('#conArea').val('');
=======
    $('#conArea').text('');
>>>>>>> origin/master
    $('#random').attr('disabled','disabled');
    $('#size').attr('disabled','disabled');
    $('#addLabels').attr('disabled','disabled');
    $('#selectAlgorithm').attr('disabled','disabled');
    disableAgents();
}


function enableButtons()
{
    stop = true;
    if(algorithm!='4'){
        agents = [];
        k = 0;
        enableAgents();

    }
<<<<<<< HEAD
=======
    
>>>>>>> origin/master
    $('#start').text('Start');
    $('#random').removeAttr('disabled');
    $('#size').removeAttr('disabled');
    $('#addLabels').removeAttr('disabled');
<<<<<<< HEAD

    $('#selectAlgorithm').removeAttr('disabled');

=======
   
    $('#selectAlgorithm').removeAttr('disabled');
    
>>>>>>> origin/master
}

function disableAgents()
{
    $('#k').attr('disabled','disabled');
    $('#create').attr('disabled','disabled');
    $('#random').attr('disabled','disabled');
}

function enableAgents()
{
    $('#k').removeAttr('disabled');
    $('#create').removeAttr('disabled');
    $('#random').removeAttr('disabled');
}
