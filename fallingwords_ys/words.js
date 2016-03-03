console.log("JS two have loaded")

var wordCollection = "sausage blubber pencil cloud moon water computer school network hammer walking violently mediocre literature chair two window cords musical zebra xylophone penguin home dog final ink teacher fun website banana uncle softly mega ten awesome attatch blue internet bottle tight zone tomato prison hydro cleaning telivision send frog cup book zooming falling evily gamer lid juice moniter captain bonding loudly thudding guitar shaving hair soccer water racket table late media desktop flipper club flying smooth monster purple guardian bold hyperlink presentation world national comment element magic lion sand crust toast jam hunter forest foraging silently tawesomated joshing pong"

var wordArray = wordCollection.split(" "); // splitting string into words

// var fallingWord = {
//   currentWord: null,
//   generateCurrentWord: function() {
//     this.currentWord = wordArray[0]; // grabbing first word and placing it into current word
//     console.log(this.currentWord);
//     wordArray.push(wordArray.shift()); // moving first word to become last
//     // console.log(wordArray);
//   },
//   wordLeftPosition: null,
//   generateWordPosition: function() {
//     this.wordLeftPosition = Math.floor(Math.random() * (845 - 15)) + 15; // generate number that will determine word position
//     console.log("Word position is " + this.wordLeftPosition);
//   },
//   wordNode: null,
//   generateWordNode: function() {
//     var newWord = document.createElement('span');
//     newWord.innerText = this.currentWord;
//     newWord.style.position = "absolute";
//     newWord.style.left = this.wordLeftPosition + "px";
//     newWord.style.top = "-10px"
//     this.wordNode = newWord;
//     console.log("Node has been generated " + this.wordNode);
//   },
//   displayCurrentWord: function() {
//     gameField.appendChild(this.wordNode);
//     console.log("Node has been displayed");
//   },
//   moveWordDown: function() {
//     that = this.wordNode;
//     var top = -10;
//     var fallDown = setInterval(function() {
//     that.style.top = top + "px";
//     console.log("moving down by " + top + "px");
//     if (top <= 540) {
//       top += 1;
//     } else {
//     that.classList.add('explode');
//     window.clearInterval(fallDown);
//   }}, 10);
//   }
