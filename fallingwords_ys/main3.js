console.log("JS has loaded...")

var gameField = document.querySelector('.gamefield');
var userInputBox = document.querySelector('.useranswer');
var startButton = document.querySelector('.start');
var scoreDisplay = document.querySelector('.placeforscore');
var stopButton = document.querySelector('.stop');

var gameMechanics = {
  currentWord: null,
  generateCurrentWord: function() {
    console.log("running generateCurrentWord");
    // this.checkPlayerScore()
    if (this.gameOver === true) {
      this.gameOverMessage();
    } else {
      player.winStatus = false;
      this.currentWord = wordArray[0]; // grabbing first word and placing it into current word
      // console.log("current word is " + this.currentWord);
      wordArray.push(wordArray.shift()); // moving first word to become last
      // console.log(wordArray);
      // console.log(newWordObject);
      this.generateWordPosition();
    }
  },
  wordLeftPosition: null,
  wordTopPosition: -20,
  generateWordPosition: function() {
    console.log("running generateWordPosition");
    this.wordLeftPosition = Math.floor(Math.random() * (700 - 25)) + 25; // generate number that will determine word position
    // console.log("Word position is " + this.wordLeftPosition);
    this.generateWordNode();
  },
  wordNode: null,
  generateWordNode: function() {
    console.log("running generateWordNode");
    var newWordEl = document.createElement('span');
    newWordEl.innerText = this.currentWord;
    newWordEl.style.position = "absolute";
    newWordEl.style.left = this.wordLeftPosition + "px";
    newWordEl.style.top = this.wordTopPosition + "px";
    this.wordNode = newWordEl;
    // console.log("Node has been generated " + this.wordNode);
    this.displayCurrentWord();
  },
  displayCurrentWord: function() {
    console.log("running displayCurrentWord");
    gameField.appendChild(this.wordNode);
    // console.log("Node has been displayed");
    this.moveWordDown();
  },
  moveWordDown: function() {
    console.log("running moveWordDown");
    that = this;
    var top = this.wordTopPosition;
    var fallDown = setInterval(function() {
    that.wordNode.style.top = top + "px";
    // console.log("moving down by " + top + "px");
    that.checkPlayerScore();
    if (that.gameOver === true) {
      that.gameOverMessage();
      window.clearInterval(fallDown);
    } else {
      if (top < 540 && player.winStatus === false) {
        top += 1;
      } else if (top === 540) {
        top += 1;
        player.wrongAnswer();
      } else if (this.gameOver === true) {
        window.clearInterval(fallDown);
      }
      else {
        that.wordNode.classList.add('explode');
        window.clearInterval(fallDown);
        that.generateCurrentWord();
      };
    }
  }, 10);
  },
  abortMoveDown: function() {
    console.log("running abortMoveDown");
    this.wordNode.remove();
    this.wordTopPosition = -20;
    // this.generateCurrentWord();
  },
  checkresult: function() {
    console.log("running checkresult");
    // console.log("checking result - user typed " + player.typedWord);
    if (player.typedWord === gameMechanics.currentWord) {
      gameMechanics.abortMoveDown();
      player.correctAnswer();
      player.winStatus = true;
    } else {
      player.wrongAnswer();
    }
  },
  checkPlayerScore: function() {
    console.log("running checkPlayerScore");
    if (player.score < 0) {
      this.gameOver = true;
    } else {
      this.gameOver = false;
    }
  },
  gameOver: false,
  gameOverMessage: function() {
    console.log("running gameOverMessage");
    gameField.innerHTML = "<h1 style=text-align:center>Game Over</h1>";
  },
  resetGame: function() {
    console.log("running resetGame");
    var that = gameMechanics;
    that.currentWord = null;
    that.wordLeftPosition = null;
    that.wordTopPosition = -10;
    that.wordNode = null;
    that.gameOver = false;
    gameField.innerHTML = '';
  }
};

var player = {
  typedWord: null,
  score: 10,
  winStatus: false,
  wrongAnswer: function() {
    console.log("running wrongAnswer");
    // console.log("Wrong: updating score");
      this.score -= 5;
      this.updateScoreNode();
      // console.log("user score is " + this.score);
    },
  correctAnswer: function() {
    console.log("running correctAnswer");
    // console.log("Correct: updating score");
    this.score += 5;
    this.updateScoreNode();
    // console.log("user score is " + this.score);
  },
  updateScoreNode: function() {
    console.log("running updateScoreNode");
    if (this.score >= 0) {
      scoreDisplay.innerText = this.score;
    } else {
      scoreDisplay.innerText = "TOO LOW";
    }
  },
  resetPlayer: function() {
    console.log("running resetPlayer");
    var that = player;
    that.winStatus = false;
    that.score = 10;
    that.updateScoreNode();
  }
}

startButton.addEventListener('click', function(event) {
    gameMechanics.resetGame();
    player.resetPlayer();
    gameMechanics.generateCurrentWord();
    userInputBox.focus();
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
    gameMechanics.gameOver = true;
    gameMechanics.gameOverMessage();
});
