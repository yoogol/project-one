console.log("JS has loaded...")

var gameField = document.querySelector('.gamefield');

// create the new word
function FactoryOfWords(currentWord) {

  var newFallingWord = {};

  newFallingWord.currentWord = currentWord;
  newFallingWord.wordLeftPosition = null;
  newFallingWord.wordNode = null;
  return newFallingWord;
};


// game mechanics object
var gameMechanics = {
  generateCurrentWord: function() {
    var currentWord = wordArray[0]; // grabbing first word and placing it into current word
    console.log(currentWord);
    wordArray.push(wordArray.shift()); // moving first word to become last
    // console.log(wordArray);
    var newWordObject = FactoryOfWords(currentWord);
    console.log(newWordObject);
    this.generateWordPosition(newWordObject);
  },
  generateWordPosition: function(newWordObject) {
    newWordObject.wordLeftPosition = Math.floor(Math.random() * (845 - 15)) + 15; // generate number that will determine word position
    console.log("Word position is " + newWordObject.wordLeftPosition);
    this.generateWordNode(newWordObject);
  },
  generateWordNode: function(newWordObject) {
    var newWordEl = document.createElement('span');
    newWordEl.innerText = newWordObject.currentWord;
    newWordEl.style.position = "absolute";
    newWordEl.style.left = newWordObject.wordLeftPosition + "px";
    newWordEl.style.top = "-10px"
    newWordObject.wordNode = newWordEl;
    console.log("Node has been generated " + newWordObject.wordNode);
    this.displayCurrentWord(newWordObject);
  },
  displayCurrentWord: function(newWordObject) {
    gameField.appendChild(newWordObject.wordNode);
    console.log("Node has been displayed");
    this.moveWordDown(newWordObject);
  },
  moveWordDown: function(newWordObject) {
    that = newWordObject.wordNode;
    var top = -10;
    var fallDown = setInterval(function() {
    that.style.top = top + "px";
    console.log("moving down by " + top + "px");
    if (top <= 540) {
      top += 1;
    } else {
      that.classList.add('explode');
      window.clearInterval(fallDown);
      gameMechanics.generateCurrentWord();
    };
    }, 10);
  }
};

var playgame = function() {
    gameMechanics.generateCurrentWord();
}
