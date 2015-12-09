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
        $('#moves').val('');
        $('#idealtime').val('');



    });

    $('#create').click(function () {
        enableButtons();
        drawGraph(1);
        checkK();
        initGathering();
    });

    $('#random').click(function () {
        enableButtons();
        drawGraph(1);
        // get a valid number of k
        k = Math.floor(Math.random() * (n - 2));
        k = (k < 2) ? 2 : k;
        $('#k').val(k);
        if (algorithm == '3'){
          if (k < 3) k = 4;
          if (n < 5){
            confirm('Number of nodes n must be at least 5.');
            return;
          }
          baseAgents();
        }else{
          randomAgents();
        }
        // generate agents
        initGathering();
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
        if(algorithm=='5')return;
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
    if(algorithm!='4' && algorithm!='5'){
        agents = [];
        k = 0;
        enableAgents();

    }

    $('#start').text('Start');
    $('#random').removeAttr('disabled');
    $('#size').removeAttr('disabled');
    $('#addLabels').removeAttr('disabled');

    $('#selectAlgorithm').removeAttr('disabled');

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
