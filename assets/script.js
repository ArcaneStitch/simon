var buttonColors = ["red", "blue", "green", "yellow"]; // array of tile colors
var gamePattern = []; // array when game starts
var userClickedPattern = []; // user's clicks
var gameStart = false;
var level = 0;

$(document).keypress(function () {
  // when user clicks on a key, the game will start and call the function nextSequence()
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(function () {
  // checks the user's button click
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // this function is called to compare the user's clicks and the computer's clicks
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      // if both patterns are the same, then find next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("no");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("#level-title").text("Game Over, press any key to restart.");
    startOver();
  }
}

function nextSequence() {
  // this function adds a random click to the sequence
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
