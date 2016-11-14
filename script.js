
var wins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [3, 6, 9],
  [2, 5, 8]
];

$(document).ready(function() {
  $(".signTwo").addClass("hidden");
  $(".signOne").addClass("hidden");
  $(".board").addClass("hidden");
  var oneList = [];
  var twoList = [];
  var playedList = [];
  var playerOne;
  var playerTwo;
  var currPlayer;
  var computer = false;
  var over = false;

  $("#first").click(function() {
    $(".signOne").removeClass("hidden");
    $(".players").addClass("hidden");
  });

  $("#second").click(function() {
    $(".signTwo").removeClass("hidden");
    $(".players").addClass("hidden");
    computer = true;
  });

  $(".x").click(function() {
    playerOne = "x";
    playerTwo = "o";
    currPlayer = playerOne;
    $(".signOne").addClass("hidden");
    $(".signTwo").addClass("hidden");
    $(".board").removeClass("hidden");
    $('#p1').html('X');
    $('#p2').html('O');
  });

  $(".o").click(function() {
    playerOne = "o";
    playerTwo = "x";
    currPlayer = playerOne;
    $(".signOne").addClass("hidden");
    $(".signTwo").addClass("hidden");
    $(".board").removeClass("hidden");
    $('#p2').html('X');
    $('#p1').html('O');
  });

  $(".startOver").click(function() {
    oneList = [];
    over = false;
     twoList = [];
     playedList = [];
    computer = false;
    playerOne = "";
    playerTwo = "";
    currPlayer = "";
    $(".signTwo").addClass("hidden");
    $(".players").removeClass("hidden");
    $(".signOne").addClass("hidden");
    $(".board").addClass("hidden");
    for (var i = 1; i <= 9; i++) {
      $("#" + i).html("");
       $("#msg").html("");
    }
  });

  $("td").click(function() {
    var num = $(this).attr('id');
    if ( (over == false) && (playedList.indexOf(num) == -1)) {
      $("#" + num).html(currPlayer);
      playedList.push(num);
      if (currPlayer == playerOne) {
        oneList.push(num);
        winCheck(oneList);
        currPlayer = playerTwo;
      } else {
        twoList.push(num);
        winCheck(twoList);
        currPlayer = playerOne;
      }
    }
  });

function winCheck(lst) {
for(var i = 0; i<8; i++){
  var win = wins[i];
 if ((inArray(lst, win[0])>0) && (inArray(lst, win[1])>0) && (inArray(lst, win[2])>0)) {
   $("#msg").html("win!"); 
   over = true;
} else if (playedList.length==9 && over == false){
  $("#msg").html("tie");
  over = true;
}
}
}
  
function inArray(arr, x) {
  for (var i = 0; i<arr.length; i++) {
    if (arr[i] == x){
      return 1;
    }
  }
  return 0;
}
});

