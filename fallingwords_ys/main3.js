console.log("JS has loaded...")

var gameField = document.querySelector('.gamefield');
var userInputBox = document.querySelector('.useranswer');
var startButton = document.querySelector('.start');

// create the new word
// function FactoryOfWords(currentWord) {
//
//   var newFallingWord = {};
//
//   newFallingWord.currentWord = currentWord;
//   newFallingWord.wordLeftPosition = null;
//   newFallingWord.wordNode = null;
//   return newFallingWord;
// };


// game mechanics object
var gameMechanics = {
  currentWord: null,
  generateCurrentWord: function() {
    player.winStatus = false;
    this.currentWord = wordArray[0]; // grabbing first word and placing it into current word
    // console.log(this.currentWord);
    wordArray.push(wordArray.shift()); // moving first word to become last
    // console.log(wordArray);
    // console.log(newWordObject);
    this.generateWordPosition();
  },
  wordLeftPosition: null,
  wordTopPosition: -10,
  generateWordPosition: function() {
    this.wordLeftPosition = Math.floor(Math.random() * (700 - 25)) + 15; // generate number that will determine word position
    // console.log("Word position is " + this.wordLeftPosition);
    this.generateWordNode();
  },
  wordNode: null,
  generateWordNode: function() {
    var newWordEl = document.createElement('span');
    newWordEl.innerText = this.currentWord;
    newWordEl.style.position = "absolute";
    newWordEl.style.left = this.wordLeftPosition + "px";
    this.wordNode = newWordEl;
    // console.log("Node has been generated " + this.wordNode);
    this.displayCurrentWord();
  },
  displayCurrentWord: function() {
    this.wordNode.style.top = this.wordTopPosition;
    gameField.appendChild(this.wordNode);
    // console.log("Node has been displayed");
    this.moveWordDown();
  },
  moveWordDown: function() {
    that = this;
    var top = -10;
    var fallDown = setInterval(function() {
    that.wordNode.style.top = top + "px";
    // console.log("moving down by " + top + "px");
    if (top < 540 && player.winStatus === false) {
      top += 1;
    } else if (top === 540) {
      top += 1;
      player.wrongAnswer();
    }
    else {
      that.wordNode.classList.add('explode');
      window.clearInterval(fallDown);
      that.generateCurrentWord();
    };
    }, 10);
  },
  abortMoveDown: function() {
    this.wordNode.remove();
    this.wordTopPosition = -10;
    // this.generateCurrentWord();

  },
  checkresult: function() {
    if (player.typedWord === gameMechanics.currentWord) {
      gameMechanics.abortMoveDown();
      player.correctAnswer();
      player.winStatus = true;
    } else {
      player.wrongAnswer();
    }
  }
};

var player = {
  typedWord: null,
  score: 10,
  winStatus: false,
  wrongAnswer: function() {
    console.log("Wrong: updating score");
      this.score -= 5;
      console.log("user score is " + this.score);
    },
  correctAnswer: function() {
    console.log("Correct: updating score");
    this.score += 5;
    console.log("user score is " + this.score);
  }
}

window.onload = function() {
  startButton.addEventListener('click', function(event) {
    gameMechanics.generateCurrentWord();
    userInputBox.focus();
    userInputBox.addEventListener("keypress", function(event) {
      var key = event.which;
      if (key === 13) {
        // console.log(this.value);
        player.typedWord = this.value;
        gameMechanics.checkresult();
        this.value = "";
        userInputBox.focus();
    }
  })
})}
// var playgame = function() {
//   });
//
