console.log("JS has loaded...")


var gameField = document.querySelector('.gamefield');

// make words and make them fall down

function FactoryOfWords(currentWord,wordLeftPosition,wordNode) {
  var newFallingWord = {};

  newFallingWord.currentWord = currentWord;
  newFallingWord.generateCurrentWord = function() {
    this.currentWord = wordArray[0]; // grabbing first word and placing it into current word
    console.log(this.currentWord);
    wordArray.push(wordArray.shift()); // moving first word to become last
    // console.log(wordArray);
    this.generateWordPosition();
  };
  newFallingWord.wordLeftPosition = wordLeftPosition;
  newFallingWord.generateWordPosition = function() {
    this.wordLeftPosition = Math.floor(Math.random() * (845 - 15)) + 15; // generate number that will determine word position
    console.log("Word position is " + this.wordLeftPosition);
    this.generateWordNode();
  };
  newFallingWord.wordNode = wordNode;
  newFallingWord.generateWordNode = function() {
    var newWord = document.createElement('span');
    newWord.innerText = this.currentWord;
    newWord.style.position = "absolute";
    newWord.style.left = this.wordLeftPosition + "px";
    newWord.style.top = "-10px"
    this.wordNode = newWord;
    console.log("Node has been generated " + this.wordNode);
    this.displayCurrentWord();
  };
  newFallingWord.displayCurrentWord = function() {
    gameField.appendChild(this.wordNode);
    console.log("Node has been displayed");
    this.moveWordDown();
  };
  newFallingWord.moveWordDown = function() {
    that = this.wordNode;
    var top = -10;
    var fallDown = setInterval(function() {
    that.style.top = top + "px";
    console.log("moving down by " + top + "px");
    if (top <= 540) {
      top += 1;
    } else {
    that.classList.add('explode');
    window.clearInterval(fallDown);
    }}, 10);
  };
  return newFallingWord;
};


var playgame = function() {
    var i = wordArray.length - 1;
      for (var i = 0; i < wordArray.lenght; i++) {
      var intervalID = window.setTimeout(function() {
        var newWord = FactoryOfWords();
        newWord.generateCurrentWord();
        // i -= 1
        // if (i === 0) {
        //   windown.clearInterval(intervalID);
        // }
      },5000)
  };
}
// make words react to user input

// make a player and capture actions


//
