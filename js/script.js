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

$('#restart').mouseover(function(){
  $(this).css('background-color', 'rgb(39,249,255)');
});

$('#restart').mouseout(function(){
  $(this).css('background-color', 'grey');
});

$('#restart').on('click', function(){
  location.reload();
});

var switchPlayer = function(){
  if(currentPlayer === "X"){
    currentPlayer = "O";
    $('#currentPlayer').text("2");
  }else{
    currentPlayer = "X";
    $('#currentPlayer').text("1");
  }
}

var checkBox = function(boxValue){
  if(boxValue !== ""){
    boxFull = true;
  }else{
    boxFull = false;
  }
}

var checkWinner = function(){
  var y = currentPlayer;
  var turd = (($('#1').text() === y) && ($('#2').text() === y) && ($('#3').text() === y))
  || (($('#4').text() === y) && ($('#5').text() === y) && ($('#6').text() === y))
  || (($('#7').text() === y) && ($('#8').text() === y) && ($('#9').text() === y))
  || (($('#1').text() === y) && ($('#4').text() === y) && ($('#7').text() === y))
  || (($('#2').text() === y) && ($('#5').text() === y) && ($('#8').text() === y))
  || (($('#3').text() === y) && ($('#6').text() === y) && ($('#9').text() === y))
  || (($('#1').text() === y) && ($('#5').text() === y) && ($('#9').text() === y))
  || (($('#7').text() === y) && ($('#5').text() === y) && ($('#3').text() === y))
  return turd;
}

var reset = function(){
  $('.square').text("");
  turns = 0;
}


$('.square').on('click', function(){
  checkBox($(this).text());
  if(boxFull){
      switchPlayer();
  }else{
      $(this).text(currentPlayer);
      turns++;
  }

  if(checkWinner()){
    $('#outcome').text(currentPlayer + " Wins!");
    $("#outcome").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200);
    if(currentPlayer === "X"){
      count1++;
      $('#score1').text(count1);
      reset();

      if(count1 < 3){
        $('#p2shipbottom').removeClass("swing animated");
        setTimeout(function(){
          $('#p2shipbottom').addClass("swing animated");
        }, 1400);
      }else if(count1 >= 3){
        $('.p2ShipPart').addClass('fadeOutDownBig');
        setTimeout(function(){
          $('.gameover').css('display', 'block');
        }, 2500);
      }
    }else{
      count2++;
      $('#score2').text(count2);
      reset();

      if(count2 < 3) {
        $('#p1shipbottom').removeClass("swing animated");
        setTimeout(function(){
          $('#p1shipbottom').addClass("swing animated");
        }, 1400);
      }else if(count2 >=3){
        $('.p1ShipPart').addClass('fadeOutDownBig');
        setTimeout(function(){
          $('.gameover').css('display', 'block');
        }, 2500);
      }

    }
  }else{
    if(turns >= 9){

      $('#outcome').text("Tie game!");
      $("#outcome").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200);
      reset();
    }else{
      switchPlayer();
    }
  }
});

});
