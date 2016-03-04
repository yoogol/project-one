console.log("JS has loaded...")

var gameField = document.querySelector('.gamefield');
var userInputBox = document.querySelector('.useranswer');
var startButton = document.querySelector('.start');
var scoreDisplay = document.querySelector('.placeforscore');
var stopButton = document.querySelector('.stop');
var typedWordDisplay = document.querySelector('.placeforword');



var elProperties = {
  wordStringLength: function(string) {
    return 48 * string.length; // 48 is the width of the font I chose
    // var rulerEl = document.querySelector("#ruler"); // a technical element necessary to calculate the px length of each falling word to ensure it doesn't go outside of the screen
    // console.log("Ruler:");
    // console.log(rulerEl);
    // rulerEl.innerText = string;
    // return rulerEl.offsetWidth;
  },
  // stringLength: this.wordStringLength("hello"),
  gameFieldHeight: gameField.offsetHeight,
  gameFieldWidth: gameField.offsetWidth,
  gameFieldLeftProp: 0
}
// code for ruler taked from https://blog.mastykarz.nl/measuring-the-length-of-a-string-in-pixels-using-javascript/

// objects with properties and methods necessary to play the game
var gameMechanics = {
  gameInProgress: false,
  randomizeWords: function() {
    var i = wordArray.length;
    while (i > 0) {
      var j = Math.floor(Math.random() * i);
       i--;
      var temp = wordArray[i];
      wordArray[i] = wordArray[j];
      wordArray[j] = temp;
    }
  },
  currentWord: null,
  // generate current word to be added
  generateCurrentWord: function() {
    // console.log("running generateCurrentWord");
    // check if the user used up all their scores
    if (this.gameOver === true) { // if yes, initiate game over message
      this.gameOverMessage();
    } else if (this.youWin === true) {
      this.youWinMessage();
    } else { // if not, set
      player.youGotIt = false; // reset the word win status
      this.currentWord = wordArray[0]; // grabbing first word of the array and placing it into current word
      wordArray.push(wordArray.shift()); // moving first word in the array to become last (shuffling)
      this.generateWordNode(); // initiate creation of the node element for the word
    }
  },
  wordNode: null,
  // creating node for the current word
  generateWordNode: function() {
    // console.log("running generateWordNode");
    var newWordEl = document.createElement('span');
    newWordEl.innerText = this.currentWord;
    newWordEl.style.position = "absolute";
    // newWordEl.style.left = this.wordLeftPosition + "px";
    // newWordEl.style.top = this.wordTopPosition + "px";
    this.wordNode = newWordEl;
    // console.log("WORD NODE WIDTH IS ");
    // console.log(this.wordNode.clientWidth);
    this.generateWordPosition(); // initiate word's random position on x axis
  },
  wordLeftPosition: null,
  wordTopPosition: -20,
  // pick random position for the word to appear on the screen on x-axis
  generateWordPosition: function() {
    // console.log("running generateWordPosition");
    this.wordLeftPosition = Math.floor(Math.random() * ((elProperties.gameFieldWidth - elProperties.wordStringLength(this.currentWord)) - (elProperties.gameFieldLeftProp + elProperties.wordStringLength(this.currentWord))) + (elProperties.gameFieldLeftProp + elProperties.wordStringLength(this.currentWord)));; // generate random number that will determine word position
    console.log("Word position is ");
    console.log(this.wordLeftPosition);
    this.wordNode.style.left = this.wordLeftPosition + "px";
    this.wordNode.style.top = this.wordTopPosition + "px";
    this.displayCurrentWord(); // initiate the word node to actually appear on the screen
  },
  // append the newly created node to the screen
  displayCurrentWord: function() {
    // console.log("running displayCurrentWord");
    gameField.appendChild(this.wordNode);
    this.moveWordDown(); // start moving the word down
  },
  movingSpeed: 10,
  // function to move the word down
  moveWordDown: function() {
    // console.log("running moveWordDown");
    that = this; // prevent this hoisting
    var top = this.wordTopPosition; // set the initial position of the word to -20
    var fallDown = setInterval(function() { // start the falldown by incrementing "top" with use of setInterval
    that.wordNode.style.top = top + "px";
    that.checkPlayerScore(); // at each run of the interval, check if the user has used up all their scores
    if (that.gameOver === true) { // if yes, clear interval and display game over
      that.gameOverMessage();
      window.clearInterval(fallDown);
    } else if (that.youWin === true) {
      that.youWinMessage();
      window.clearInterval(fallDown);
    } else { // if no, move the word down
      if (top < elProperties.gameFieldHeight - 24 && player.youGotIt === false) { // make sure the word has not reached the end of the screen, the user has not picked the right word
        top += 1;
      } else if (top === elProperties.gameFieldHeight - 24) { // see if the word has reached the end: if yes, reduce the score
        top += 1;
        player.wrongAnswer();
      }
      // else if (this.gameOver === true) { //
      //   window.clearInterval(fallDown);
      // }
      else { // if it's passed the end of the screen and/or if the youGotIt is true,
        that.wordNode.classList.add('explode');
        window.clearInterval(fallDown);
        that.wordNode.remove();
        that.generateCurrentWord();
      };
    }
  }, that.movingSpeed);
  },
  abortMoveDown: function() {
    // console.log("running abortMoveDown");
    this.wordNode.remove();
    this.wordTopPosition = -20;
    // this.generateCurrentWord();
  },
  checkresult: function() {
    // console.log("running checkresult");
    // console.log("checking result - user typed " + player.typedWord);
    if (player.typedWord === gameMechanics.currentWord) {
      gameMechanics.abortMoveDown();
      player.correctAnswer();
      player.youGotIt = true; // set word win status to true to remove the word from the field and initiate the new one
      typedWordDisplay.innerHTML = '<p style="font-size: 1em;color:green">' + player.typedWord + "</p>";
    } else {
      player.wrongAnswer();
      typedWordDisplay.innerHTML = '<p style="font-size: 1em;color:red">' + player.typedWord + "</p>";
    }
  },
  checkPlayerScore: function() {
    // console.log("running checkPlayerScore");
    if (player.score < 0 || this.gameOver === true) {
      this.gameOver = true;
    } else if (player.score > 150) {
      // console.log("You won!");
      gameMechanics.youWin = true;
      gameMechanics.youWinMessage();
    } else if (player.score > 90) {
      console.log("speed 3")
      this.movingSpeed = 3;
    } else if (player.score > 70) {
      console.log("speed 5")
      this.movingSpeed = 5;
    } else if (player.score > 50) {
      console.log("speed 10")
      this.movingSpeed = 10;
    } else if (player.score > 30) {
      console.log("speed 25")
      this.movingSpeed = 25;
    } else {
      this.gameOver = false;
    }
  },
  gameOver: false,
  gameOverMessage: function() {
    // console.log("running gameOverMessage");
    this.gameInProgress = false;
    gameField.innerHTML = "<h1 style=text-align:center;color:white>Game Over</h1>";

  },
  youWin: false,
  youWinMessage: function() {
    // console.log("running youWinMessage");
    this.gameInProgress = false;
    gameField.innerHTML = "<h1 style=text-align:center;color:white>You win!</h1>";
  },
  resetGame: function() {
    // console.log("running resetGame");
    var that = gameMechanics;
    that.currentWord = null;
    that.wordLeftPosition = null;
    that.wordTopPosition = -10;
    that.wordNode = null;
    that.gameOver = false;
    that.youWin = false;
    gameField.innerHTML = '';
  }
};

var player = {
  typedWord: null,
  score: 0,
  youGotIt: false,
  wrongAnswer: function() {
    // console.log("running wrongAnswer");
    // console.log("Wrong: updating score");
      this.score -= 5;
      this.updateScoreNode();
      console.log("adding color to wrong answer");

      gameMechanics.wordNode.classList.add("wrong");
      console.log(gameMechanics.wordNode.classList);
      console.log("removing color");
      setTimeout(function() { gameMechanics.wordNode.classList.remove("wrong")},500);
      console.log(gameMechanics.wordNode.classList);

      // console.log("user score is " + this.score);
    },
  correctAnswer: function() {
    // console.log("running correctAnswer");
    // console.log("Correct: updating score");
    this.score += 5;
    this.updateScoreNode();
    // console.log("user score is " + this.score);
  },
  updateScoreNode: function() {
    // console.log("running updateScoreNode");
    if (this.score >= 0) {
      scoreDisplay.innerHTML = "<p style=font-family:'Righteous',cursive>" + this.score + "</p>";
    //   if (this.youGotIt === false) {
    //     scoreDisplay.style.color = "red";
    // } else {
    //     scoreDisplay.style.color = "green";
    //   }
    } else {
      scoreDisplay.innerHTML = "<p style=color:purple>YOU LOST :(</p>";
    }
  },
  resetPlayer: function() {
    // console.log("running resetPlayer");
    var that = player;
    that.youGotIt = false;
    that.score = 10;
    that.updateScoreNode();
  }
}

startButton.addEventListener('click', function(event) {
    if (gameMechanics.gameInProgress === false) {
      gameMechanics.gameInProgress = true;
      gameMechanics.randomizeWords();
      gameMechanics.resetGame();
      player.resetPlayer();
      gameMechanics.generateCurrentWord();
      userInputBox.focus();
    } else {
      console.log("Game is in progress");
    }
});

userInputBox.addEventListener("keypress", function(event) {
  var key = event.which;
  if (key === 13) {
    // console.log("typing is workin");
    // console.log(this.value);
    player.typedWord = this.value;
    // console.log("user typed " + player.typedWord);
    gameMechanics.checkresult();
    var that = this;
    setTimeout(function () {
      that.value = "";
      userInputBox.focus();
    }, 100);
}
});

stopButton.addEventListener('click', function(event) {
  // console.log("Game Stopped");
    gameMechanics.gameInProgress = false;
    gameMechanics.gameOver = true;
    gameMechanics.gameOverMessage();
});
