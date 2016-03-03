console.log("JS has loaded...")


var gameField = document.querySelector('.gamefield');

// make words fall down
var fallingWord = {
  currentWord: null,
  generateCurrentWord: function() {
    this.currentWord = wordArray[0]; // grabbing first word and placing it into current word
    console.log(this.currentWord);
    wordArray.push(wordArray.shift()); // moving first word to become last
    // console.log(wordArray);
  },
  wordLeftPosition: null,
  generateWordPosition: function() {
    this.wordLeftPosition = Math.floor(Math.random() * (845 - 15)) + 15; // generate number that will determine word position
    console.log("Word position is " + this.wordLeftPosition);
  },
  wordNode: null,
  generateWordNode: function() {
    var newWord = document.createElement('span');
    newWord.innerText = this.currentWord;
    newWord.style.position = "absolute";
    newWord.style.left = this.wordLeftPosition + "px";
    newWord.style.top = "-10px"
    this.wordNode = newWord;
    console.log("Node has been generated " + this.wordNode);
  },
  displayCurrentWord: function() {
    gameField.appendChild(this.wordNode);
    console.log("Node has been displayed");
  },
  moveWordDown: function() {
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
  }
}
var playgame = function() {
fallingWord.generateCurrentWord();
fallingWord.generateWordPosition();
fallingWord.generateWordNode();
fallingWord.displayCurrentWord();
fallingWord.moveWordDown();
};
// make words react to user input

// make a player and capture actions


//
