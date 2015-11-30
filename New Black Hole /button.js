$(document).ready(function () { 
    
    drawGraph(1);
    
    $('#draw').click(function () {
        checkN();
        enableButtons();
    });
     
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
    
    $('#stop').click(function () {
        enableButtons();
        drawGraph(1);
    });
    
    $('#create').click(function () {
        enableButtons();
        drawGraph(1);
        checkK();
        //initGathering();
        initAgents(algorithm);

    });
    
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
        //initGathering();
        initAgents(algorithm);
    });
    
    $('#size').change(function() {
        done = k;
        drawGraph(1);
    });
    
    $('#speedBar').change(function() {
        changeSpeed();
    });
    
    $('#addLabels').click(function() {
        addLabels = !addLabels;
        drawGraph(1);
    });
    
    $('#selectAlgorithm').change(function() {
        algorithm = $(this).val();
        k = 0;
        enableButtons();
        drawGraph(1);
    });
    
    $('.buttons').mouseenter(function () {
        $(this).fadeTo('fast', 0.6);
    });

    $('.buttons').mouseleave(function () {
        $(this).fadeTo('fast', 1);
    });
    
});


function disableButtons()
{
    pause  = false;
    stop = false;
    $('#start').text('Pause');
    $('#conArea').text('');
    $('#random').attr('disabled','disabled');
    $('#size').attr('disabled','disabled');
    $('#addLabels').attr('disabled','disabled');
    $('#selectAlgorithm').attr('disabled','disabled');
    disableAgents();
}


function enableButtons()
{
    stop = true;
    agents = [];
    k = 0;
    $('#start').text('Start');
    $('#random').removeAttr('disabled');
    $('#size').removeAttr('disabled');
    $('#addLabels').removeAttr('disabled');
    $('#selectAlgorithm').removeAttr('disabled');
    enableAgents();
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
