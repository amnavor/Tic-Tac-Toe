//all the possible winning combinatinos
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

//start with a clear board
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
  var compTurn = false;
  var x = "xBud";
  var o = "oBud";

//first menu option, ie single player (first) vs two player (second) 
  $("#first").click(function() {
    $(".signOne").removeClass("hidden");
    $(".players").addClass("hidden");
    computer = true;
    $("#p1Name").html("Player");
    $("#p2Name").html("Computer");
  });
  
  $("#second").click(function() {
    $(".signTwo").removeClass("hidden");
    $(".players").addClass("hidden");
    $("#p1Name").html("Player 1");
    $("#p2Name").html("Player 2");
  });

//second option menu: x vs o
  $(".x").click(function() {
    playerOne = x;
    playerTwo = o;
    currPlayer = playerOne;
    $(".signOne").addClass("hidden");
    $(".signTwo").addClass("hidden");
    $(".board").removeClass("hidden");
    $('#p1').html('X');
    $('#p2').html('O');
  });

  $(".o").click(function() {
    playerOne = o;
    playerTwo = x;
    currPlayer = playerOne;
    $(".signOne").addClass("hidden");
    $(".signTwo").addClass("hidden");
    $(".board").removeClass("hidden");
    $('#p2').html('X');
    $('#p1').html('O');
  });

//startover -- can be selected at anytime to clear all settings
  $(".startOver").click(function() {
    oneList = [];
    compTurn = false;
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
      $("#" + i).removeClass(x);
      $("#" + i).removeClass(o);
    }
    $("#msg").html("<br>");
  });

//response to clicking of tic tac toe board
  $("td").click(function() {
    var num = $(this).attr('id');
    //if game is still going, box hasn't been selected yet, and 
    //it is not the computer's turn, click will result in x/o placing
    if ((over === false) && (playedList.indexOf(num) === -1) && (compTurn === false)) {
      $("#" + num).addClass(currPlayer);
      playedList.push(num);
      if (currPlayer == playerOne) {
        oneList.push(num);
        winCheck(oneList);
        if (!over){
        currPlayer = playerTwo;
//after a pause and freeze on board, have computer take turn
        if (computer === true) {
          compTurn = true;
          setTimeout(compTurnFunc, 1000);
        }
        }
      } else {
        twoList.push(num);
        winCheck(twoList);
        currPlayer = playerOne;
      }
    }
  });

//checks if board has any three in a rows and return message
  function winCheck(lst) {
    if (comboCheck(lst)) {
      if (currPlayer == playerOne) {
        if (computer === true) {
          $("#msg").html("Groovy! You win!");
        } else {
        $("#msg").html("Groovy! Player One wins!");
        }
      } else {
        if (computer === true) {
          $("#msg").html("Bummer! You lost!");
        } else {
        $("#msg").html("Far out! Player Two wins!");
        }
      }
      over = true;
    } else if (playedList.length === 9 && over === false) {
      $("#msg").html("Tubular! It's a tie!");
      over = true;

    }
  }

//check if lst has ability to make tic-tac-toe three in a row
  function comboCheck(lst) {
    for (var i = 0; i < 8; i++) {
      var win = wins[i];
      if ((inArray(lst, win[0]) > 0) && (inArray(lst, win[1]) > 0) && (inArray(lst, win[2]) > 0)) {
        return true;
      }
    }
    return false;
  }

//check if x is in array arr.  Alternative to .indexOf() since that was being buggy on CodePen
  function inArray(arr, x) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        return 1;
      }
    }
    return 0;
  }

//computer's turn after pause--note computer is always p2
  function compTurnFunc() {
    var num = bestCompChoice();
    $("#" + num).addClass(currPlayer);
    playedList.push(num);
    twoList.push(num);
    winCheck(twoList);
    currPlayer = playerOne;
    compTurn = false;
  }

 //see if comp can get a tic-tac-toe
 function bestCompChoice() {
    var someNum = 1;
    var someList = twoList.slice(0);
    while (someNum < 10) {
      if (inArray(playedList, someNum) < 1) {
        someList.push(someNum);
        if (comboCheck(someList)) {
          return someNum;
        } else {
          someList.pop();
          someNum++;
        }
      } else {
        someNum++;
      }
    }
 //see if comp can block a tic-tac-toe
    someNum = 1;
    someList = oneList.slice(0);
    while (someNum < 10) {
      if (inArray(playedList, someNum) < 1) {
        someList.push(someNum);
        if (comboCheck(someList)) {
          return someNum;
        } else {
          someList.pop();
          someNum++;
        }
      } else {
        someNum++;
      }
    }
  //otherwise, just do the next open box
   someNum = Math.ceil((Math.random() * 10));
    while (inArray(playedList, someNum) || someNum>9) {
      someNum=Math.ceil((Math.random() * 10));
    }
    return someNum;
  }
  
});
