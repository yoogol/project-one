console.log("JS two have loaded")

var wordCollection = "Adult Aeroplane Air Aircraft Carrier Airforce Airport Album Alphabet Apple Arm Army Baby Baby Backpack Balloon Banana Bank Barbecue Bathroom Bathtub Bed Bed Bee Bible Bible Bird Bomb Book Boss Bottle Bowl Box Boy Brain Bridge Butterfly Button Cappuccino Car Car-race Carpet Carrot Cave Chair Chess Board Chief Child Chisel Chocolates Church Church Circle Circus Circus Clock Clown Coffee Coffee-shop Comet Compact Disc Compass Computer Crystal Cup Cycle Data Base Desk Diamond Dress Drill Drink Drum Dung Ears Earth Egg Electricity Elephant Eraser Explosive Eyes Family Fan Feather Festival Film Finger Fire Floodlight Flower Foot Fork Freeway Fruit Fungus Game Garden Gas Gate Gemstone Girl Gloves God Grapes Guitar Hammer Hat Hieroglyph Highway Horoscope Horse Hose Ice Ice-cream Insect Jet fighter Junk Kaleidoscope Kitchen Knife Leather jacket Leg Library Liquid Magnet Man Map Maze Meat Meteor Microscope Milk Milkshake Mist Money $$$$ Monster Mosquito Mouth Nail Navy Necklace Needle Onion PaintBrush Pants Parachute Passport Pebble Pendulum Pepper Perfume Pillow Plane Planet Pocket Post-office Potato Printer Prison Pyramid Radar Rainbow Record Restaurant Rifle Ring Robot Rock Rocket Roof Room Rope Saddle Salt Sandpaper Sandwich Satellite School Sex Ship Shoes Shop Shower Signature Skeleton Slave Snail Software Solid Space Shuttle Spectrum Sphere Spice Spiral Spoon Sports-car Spot Light Square Staircase Star Stomach Sun Sunglasses Surveyor Swimming Pool Sword Table Tapestry Teeth Telescope Television Tennis racquet Thermometer Tiger Toilet Tongue Torch Torpedo Train Treadmill Triangle Tunnel Typewriter Umbrella Vacuum Vampire Videotape Vulture Water Weapon Web Wheelchair Window Woman Worm X-ray"
//radom words source: http://members.optusnet.com.au/charles57/Creative/Techniques/random_words.htm

// var wordCollection = "sausage blubber pencil cloud moon water computer school network hammer walking violently mediocre literature chair two window cords musical zebra xylophone penguin home dog final ink teacher fun website banana uncle softly mega ten awesome attatch blue internet bottle tight zone tomato prison hydro cleaning telivision send frog cup book zooming falling evily gamer lid juice moniter captain bonding loudly thudding guitar shaving hair soccer water racket table late media desktop flipper club flying smooth monster purple guardian bold hyperlink presentation world national comment element magic lion sand crust toast jam hunter forest foraging silently tawesomated joshing pong notebook fruit rabid corn humor bite-sized tree moan foot fabulous beautiful chew hair unequal explode frogs birthday signal park efficacious knife past recognise roasted chop cloistered pot legal colour crash pump stuff thank shelter gate rabbits colossal steady pickle complex weary amused test voracious tow bawdy basin courageous zoo shirt whip needle idea strange boiling interrupt multiply girls dirty limping space bathe cast alarm bounce wholesale fire view muscle meaty switch circle hulking drag fade unequaled questionable harass giddy position boundary omniscient inconclusive undress women cause juice panoramic useless burly flaky sticky damaging judge like vague education plane step different"

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
