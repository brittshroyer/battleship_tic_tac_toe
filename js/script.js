$( document ).ready(function() {

  var player1;
  var player2;
  var count1 = 0;
  var count2 = 0;
  var x = "X";
  var o = "O";
  var player1 = true;
  var winner = false;
  var currentPlayer = "X";
  var turns = 0;

  // Restart game 

  $('#restart').mouseover(function(){
    $(this).css('background-color', 'rgb(39,249,255)');
  });

  $('#restart').mouseout(function(){
    $(this).css('background-color', 'grey');
  });

  $('#restart').on('click', function(){
    location.reload();
  });

//Alternate Player
  var switchPlayer = function(){
    if(currentPlayer === "X"){
      currentPlayer = "O";
      $('#currentPlayer').text("2");
    }else{
      currentPlayer = "X";
      $('#currentPlayer').text("1");
    }
  }

//Check for box vacancy
  var checkBox = function(boxValue){
    if(boxValue !== ""){
      boxFull = true;
    }else{
      boxFull = false;
    }
  }

//check for a winner
  var checkWinner = function(){
    var y = currentPlayer;
    var championCheck = (($('#1').text() === y) && ($('#2').text() === y) && ($('#3').text() === y))
    || (($('#4').text() === y) && ($('#5').text() === y) && ($('#6').text() === y))
    || (($('#7').text() === y) && ($('#8').text() === y) && ($('#9').text() === y))
    || (($('#1').text() === y) && ($('#4').text() === y) && ($('#7').text() === y))
    || (($('#2').text() === y) && ($('#5').text() === y) && ($('#8').text() === y))
    || (($('#3').text() === y) && ($('#6').text() === y) && ($('#9').text() === y))
    || (($('#1').text() === y) && ($('#5').text() === y) && ($('#9').text() === y))
    || (($('#7').text() === y) && ($('#5').text() === y) && ($('#3').text() === y))
    return championCheck;
  }

//reset boxes and turn-tracker
  var reset = function(){
    $('.square').text("");
    turns = 0;
  }

//Flash winning player
  var winnerAlert = function(){
    $('#outcome').text(currentPlayer + " Wins!");
    $("#outcome").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200);
  }

//Flash "tie game"
  var tieAlert = function(){
    $('#outcome').text("Tie game!");
    $("#outcome").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200);
  }

  var updatePlayer1Score = function(){
    $('#score1').text(count1);
  }

  var updatePlayer2Score = function(){
    $('#score2').text(count2);
  }

  var shakePlayer1Ship = function(){
    $('#p1shipbottom').removeClass("swing animated");
    setTimeout(function(){
      $('#p1shipbottom').addClass("swing animated");
    }, 1400);
  }

  var shakePlayer2Ship = function(){
    $('#p2shipbottom').removeClass("swing animated");
    setTimeout(function(){
      $('#p2shipbottom').addClass("swing animated");
    }, 1400);
  }

  var sinkPlayer1Ship = function(){
    $('.p1ShipPart').addClass('fadeOutDownBig');
  }

  var sinkPlayer2Ship = function(){
    $('.p2ShipPart').addClass('fadeOutDownBig');
  }

  var showGameOver = function(){
    setTimeout(function(){
      $('.gameover').css('display', 'block');
    }, 3000);
  }

  var hideShip1 = function(){
    $('.p1ShipPart').css('display', 'none');
  }

//on each click...
  $('.square').on('click', function(){
    checkBox($(this).text());
    if(boxFull){
      switchPlayer();
    }else{
      $(this).text(currentPlayer);
      turns++;
    }
    //if there is a winner...
    if(checkWinner()){
      winnerAlert();
      if(currentPlayer === "X"){
        count1++;
        updatePlayer1Score();
        reset();
        if(count1 < 3){
          shakePlayer2Ship();
        }else if(count1 >= 3){
          sinkPlayer2Ship();
          showGameOver();
        }
      }else{
        count2++;
        updatePlayer2Score();
        reset();
        if(count2 < 3) {
          shakePlayer1Ship();
        }else if(count2 >=3){
          sinkPlayer1Ship();
          showGameOver();
          hideShip1();
        }
      }
    //if no winner...
    }else{
      if(turns >= 9){
        tieAlert();
        reset();
      }else{
        switchPlayer();
      }
    }
  });
});
