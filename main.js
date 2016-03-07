console.log("JS has loaded...")

var gameField = document.querySelector('.gamefield');
var userInputBox = document.querySelector('.useranswer');
var startButton = document.querySelector('.start');
var scoreDisplay = document.querySelector('.placeforscore');
var stopButton = document.querySelector('.stop');
var typedWordDisplay = document.querySelector('.placeforword');
var gameBody = document.querySelector('body');
var submittedNameNode = document.createElement('span');
var placeForName = document.querySelector('.nameHere');
var gameGreeting = document.createElement('div');


// object to keep track of size of elements
var elProperties = {
  wordStringLength: function(string) {
    return 24 * string.length; // 48 is the width of the font I chose
  },
  gameFieldHeight: gameField.offsetHeight,
  gameFieldWidth: gameField.offsetWidth,
  gameFieldLeftProp: 0
}

// object with properties and methods necessary to play the game
var gameMechanics = {
  gameInProgress: false,
  currentWord: null,
  wordNode: null,
  wordLeftPosition: null,
  wordTopPosition: -20,
  movingSpeed: 50,
  winningScore: 150,
  gameOver: false,
  youWin: false,
  // randomize word array
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
  // generate current word
  generateCurrentWord: function() {
    // check if the user used up all their scores
    if (this.gameOver === true) { // if yes, initiate game over message
      this.gameOverMessage();
    } else if (this.youWin === true) { // if the user has enough points, generate youwin message
      this.youWinMessage();
    } else { // if neither, start the generation
      player.youGotIt = false; // reset the word win status
      this.currentWord = wordArray[0].toLowerCase(); // grabbing first word of the array and placing it into current word
      wordArray.push(wordArray.shift()); // moving first word in the array to become last
      this.generateWordNode(); // initiate creation of the node element for the word
    }
  },
  // creating node for the current word
  generateWordNode: function() {
    var newWordEl = document.createElement('span');
    newWordEl.innerText = this.currentWord;
    newWordEl.style.position = "absolute";
    this.wordNode = newWordEl;
    this.generateWordPosition(); // initiate word's random position on x axis
  },
  // pick random position for the word to appear on the screen on x-axis
  generateWordPosition: function() {
    this.wordLeftPosition = Math.floor(Math.random() * ((elProperties.gameFieldWidth - elProperties.wordStringLength(this.currentWord)) - elProperties.gameFieldLeftProp) + elProperties.gameFieldLeftProp);; // generate random number that will determine word position
    this.wordNode.style.left = this.wordLeftPosition + "px";
    this.wordNode.style.top = this.wordTopPosition + "px";
    this.displayCurrentWord(); // initiate the word node to actually appear on the screen
  },
  // append the newly created node to the screen
  displayCurrentWord: function() {
    gameField.appendChild(this.wordNode);
    this.moveWordDown(); // start moving the word down
  },
  // move the word down
  moveWordDown: function() {
    that = this; // prevent this hoisting
    var top = this.wordTopPosition; // set the initial position of the word to -20
    var fallDown = setInterval(function() { // start the falldown by incrementing "top" with use of setInterval
    that.wordNode.style.top = top + "px";

    that.checkPlayerScore(); // at each run of the interval, check if the user has used up all their scores or if he won
    if (that.gameOver === true) { // if he lost, clear interval and display game over
      that.gameOverMessage();
      window.clearInterval(fallDown);
    } else if (that.youWin === true) { // if he won, clear interval and display you win
      that.youWinMessage();
      window.clearInterval(fallDown);
    } else { // if no win and no loss...
      if (top < elProperties.gameFieldHeight - 24 && player.youGotIt === false) { // make sure the word has not reached the end of the screen, the user has not picked the right word yet, and if yes, move down
        top += 1;
      } else if (player.youGotIt === true) {
        window.clearInterval(fallDown);
        that.generateCurrentWord();
      } else if (top === elProperties.gameFieldHeight - 24) { // if the word has reached the end, reduce the score and continue moving
        top += 1;
        player.wrongAnswer();
      } else { // if it's passed the end of the screen and/or if the youGotIt is true,
        window.clearInterval(fallDown);
        that.wordNode.remove();
        setTimeout(function () {
            that.generateCurrentWord();
        }, 300);
      };
    }
  }, that.movingSpeed);
  },
  // check whether the user typer the correce word
  checkresult: function() {
    if (player.typedWord === gameMechanics.currentWord) {
      gameMechanics.wordNode.classList.add("right");
      // set word win status to true to remove the word from the field and initiate the new one
      player.youGotIt = true;
      player.correctAnswer();
      gameMechanics.wordNode.remove();
      typedWordDisplay.innerHTML = '<p style="font-size: 1em;color:green">' + player.typedWord + "</p>";
      gameMechanics.wordNode.classList.remove("right");
    } else {
      console.log("adding color to wrong answer");

      gameMechanics.wordNode.classList.add("wrong");
      console.log(gameMechanics.wordNode.classList);
      console.log("removing color");

      setTimeout(function() { gameMechanics.wordNode.classList.remove("wrong")},300);
      console.log(gameMechanics.wordNode.classList);
      player.wrongAnswer();
      typedWordDisplay.innerHTML = '<p style="font-size: 1em;color:red">' + player.typedWord + "</p>";
    }
  },
  checkPlayerScore: function() {
    if (player.score < 0 || this.gameOver === true) {
      this.gameOver = true;
    } else if (player.score > this.winningScore) {
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
  gameOverMessage: function() {
    console.log("running gameOverMessage");
    this.gameInProgress = false;
    console.log("adding "+player.score+ " to " + player.finalScore);
    player.finalScore.push(player.score);
    gameField.innerHTML = "<h1 class='gameover'>Game Over</h1><h3 class='gameover2'>Better luck next time!</h3><h4>Current score rundown is:</h4>";
    for (var i = 0; i < player.name.length; i++) {
      var playerScore = document.createElement('p');
      console.log("final scores are " + player.finalScore);
      playerScore.innerHTML = player.name[i] + " : " + player.finalScore[i] + " points";
      gameField.appendChild(playerScore);
    }
  },
  youWinMessage: function() {
    console.log("running youWinMessage");
    this.gameInProgress = false;
    console.log("adding "+player.score+ " to " + player.finalScore);
    player.finalScore.push(player.score);
    gameField.innerHTML = "<h1 class='youwin'>Hooray!</h1><h3 class='youwin2'>You are an excellent typer!</h3><h4 class='youwin3'>(You'll make a good secretary)</h4><h4>Current score rundown is:</h4>";
    for (var i = 0; i < player.name.length; i++) {
      var playerScore = document.createElement('p');
      console.log("final scores are " + player.finalScore);
      playerScore.innerHTML = player.name[i] + " : " + player.finalScore[i] + " points";
      gameField.appendChild(playerScore);
    }
  },
  resetGame: function() {
    var that = gameMechanics;
    that.currentWord = null;
    that.movingSpeed = 50;
    that.wordLeftPosition = null;
    that.wordTopPosition = -10;
    that.wordNode = null;
    that.gameOver = false;
    that.youWin = false;
    gameField.innerHTML = '';
  },
};

var player = {
  name: [],
  finalScore: [],
  typedWord: null,
  score: 0,
  youGotIt: false,
  wrongAnswer: function() {
  // console.log("running wrongAnswer");
  // console.log("Wrong: updating score");
    this.score -= 5;
    this.updateScoreNode();

    // console.log("user score is " + this.score);
    },
  correctAnswer: function() {
    // console.log("running correctAnswer");
    // console.log("Correct: updating score");
    this.score += 5;
    this.updateScoreNode();
  },
  updateScoreNode: function() {
    if (this.score >= 0) {
      scoreDisplay.innerHTML = "<p style=font-family:'Righteous',cursive>" + this.score + " points </p>";
    } else {
      scoreDisplay.innerHTML = "<p style=color:purple>YOU LOST :(</p>";
    }
  },
  resetPlayer: function() {
    var that = player;
    that.youGotIt = false;
    that.score = 10;
    that.updateScoreNode();
  }
}

var initiateGreeting = function() {
  console.log("appending greeting");
  gameGreeting.classList.add("greeting");
  gameGreeting.style.opacity = 0;
  gameBody.appendChild(gameGreeting);
  window.getComputedStyle(gameGreeting).opacity;
  gameGreeting.style.opacity = 0.9;
  // transition opacity code learned from here: https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
  gameGreeting.innerHTML = "<p>Welcome to the <strong>FALLING WORDS</strong> typing game!</p><p>Are you a good typer? <br> Or do you constantly mistype or look at the keyboard when you type?</p><p> Let's test your typing skills!</h2><h3>Here are the rules of the game:</p><ul><li>You'll start with a 'gift' of 10 free points</li><li>You gain 5 points for every word you type correctly</li><li>You lose 5 points for every word typed incorrectly</li><li>You also lose 5 points if the word falls to the bottom before you can type it</li><li>To win, you need to get " + gameMechanics.winningScore + " points</li><li>If your score goes below 0 points, you lose - game over!</li><li>Watch out, the words may be changing their speed!</li><li>Feel free to hit the STOP button at any point to stop playing</li></ul><input class='userName' placeholder='Your Name' style=margin-right:20px><button class='confirm' type='button' name='button'>OK</button>";
  var nameForm = document.querySelector('.userName');
  var okButton = document.querySelector('.confirm');
  nameForm.focus();
  okButton.style.width = 50 + "px";
  nameForm.addEventListener("keypress", function() {
    var key = event.which;
    if (key === 13) {
      submittedNameNode.innerText = nameForm.value.toUpperCase();
      placeForName.appendChild(submittedNameNode);
      player.name.push(nameForm.value.toUpperCase());
      gameGreeting.remove();
      gameMechanics.generateCurrentWord();
      userInputBox.focus();
  }});
  okButton.addEventListener("click", function() {
    submittedNameNode.innerText = nameForm.value.toUpperCase();
    placeForName.appendChild(submittedNameNode);
    player.name.push(nameForm.value.toUpperCase());
    gameGreeting.remove();
    gameMechanics.generateCurrentWord();
    userInputBox.focus();
  })
}

startButton.addEventListener('click', function(event) {
    if (gameMechanics.gameInProgress === false) {
      initiateGreeting();
      submittedNameNode.innerText = '';
      gameMechanics.gameInProgress = true;
      gameMechanics.randomizeWords();
      gameMechanics.resetGame();
      player.resetPlayer();
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
  console.log("stop button is pushed");
    gameMechanics.gameInProgress = false;
    gameMechanics.gameOver = true;
    // gameMechanics.gameOverMessage();
});
