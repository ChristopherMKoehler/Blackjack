/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const suits = ["spades", "clubs", "diamonds", "hearts"];
const values = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "jack" : 10,
  "queen": 10,
  "king": 10,
  "ace": 11
}

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.faceUp = true;
  }

  static generateDeck() {
    let cardArray = [];
    suits.forEach((suit) => {
      Object.keys(values).forEach((value) => cardArray.push(new Card(value, suit)))
    })
    return Card.shuffle(cardArray);
  }

  static shuffle(cardArray) {
    let x, j;
    for(let i = cardArray.length; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let x = cardArray[i - 1];
      cardArray[i - 1] = cardArray[j];
      cardArray[j] = x;
    }
    return cardArray;
  }

  getValue() {
    return values[this.value];
  }

  getSuit() {
    return this.suit;
  }

  getImageUrl() {
    return this.value + "_of_" + this.getSuit() + ".png";
  }

  isAce() {
    return this.value === "ace";
  }
}

window.Card = Card;

/* harmony default export */ __webpack_exports__["a"] = (Card);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__card__ = __webpack_require__(0);


class Deck {
  constructor(deck = null) {
    this.cards = deck || __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateDeck();
  }

  draw() {
    if(this.cards.length === 0) {
      this.reset();
    }
    return this.cards.pop();
  }

  reset() {
    this.cards = __WEBPACK_IMPORTED_MODULE_0__card__["a" /* default */].generateDeck();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Deck);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cards_card__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cards_deck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__players_dealer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__players_human_player__ = __webpack_require__(5);





let deck = new __WEBPACK_IMPORTED_MODULE_1__cards_deck__["a" /* default */]();
let dealer = new __WEBPACK_IMPORTED_MODULE_2__players_dealer__["a" /* default */](deck);
let player = new __WEBPACK_IMPORTED_MODULE_3__players_human_player__["a" /* default */](deck);
let winner = null;

const resetHands = () => {
  dealer.clearHand("dealer");
  player.clearHand("player");
}

const showBetInput = () => {
  $('.play-action').hide();
  $('.add-bet').show();
  $('.done-betting').show();
}

const hideBetInput = () => {
  $('.play-action').show();
  $('.add-bet').hide();
  $('.done-betting').hide();
}

const handleWin = (winner) => {
  player.updateChipCount(winner === player);
  $('.winner').html(winner === player ? "You win!" : "You Lose!");
  $('.play-action').hide();
  $('.split').remove();
  $('.end-game').show();
}

const playAgain = () => {
  if(player.chipCount <= 0) {
    player.resetChipCount();
  }
  $('.end-game').hide();
  resetHands();
  showBetInput();
}

const declareWinner = () => {
  let playerTotal = player.getTotal();
  let dealerTotal = dealer.getTotal();

  if(playerTotal > dealerTotal || dealer.busted()) {
    handleWin(player);
  } else if(playerTotal === dealerTotal) {
    player.resetCurrentBet()
    $('.winner').html("You tied!");
    $('.play-action').hide();
    $('.end-game').show();
  } else {
    handleWin(dealer);
  }
}

$(document).ready(function() {

  $('.end-game').hide();
  $('.play-action').hide();

  $('.add-bet').on("click", (e) => {
    try{
      player.setCurrentBet(parseInt(e.currentTarget.value));
    } catch (e) {
      $('.bet-errors').html(e.message + "");
      $('.bet-errors').show();
      $('.bet-errors').fadeOut(1000);
    }
  })

  $('.done-betting').on("click", () => {
    hideBetInput();

    dealer.makeStartingMove();
    $("#card").flip({
      trigger: "manual"
    });
    player.receiveCard(deck.draw());
    player.receiveCard(deck.draw());
    if(player.blackjack()) {
      handleWin(player)
    } else if(player.canSplit()) {
      $('.player-actions').append("<button class=split>Split</button>");
    }
  })

  $('.play-action').on("click", (e) => {
    if(e.currentTarget.value === "hit") {
      player.receiveCard(deck.draw());
      if(player.busted()) {
        $("#card").flip(true);
        handleWin(dealer);
      } else if(player.blackjack()) {
        handleWin(player);
      }
    } else {
      $("#card").flip(true);
      dealer.makeMove();
      declareWinner();
    }
  })

  $('.play-again').on("click", () => playAgain());
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cards_card__ = __webpack_require__(0);


class Player {
  constructor(playerStr) {
    this.hand = [];
    this.playerStr = playerStr;
  }

  receiveCard(newCard) {
    this.hand.push(newCard);
    let id = newCard.faceUp ? "faceup" : "facedown";
    if (newCard.faceUp){
      $("." + this.playerStr + "-cards").append("<img id=" + id + " src=./card_images/" + newCard.getImageUrl() + "></img>");
    } else {
      $("." + this.playerStr + "-cards").append(
      "<div id=card><div class=front><img src=./card_images/facedown.png></img> </div> <div class=back><img src=./card_images/" + newCard.getImageUrl() + "></img></div></div>"
      );
    }

  }

  clearHand(playerStr) {
    this.hand = [];
    this.containsAce = false;
    $("." + this.playerStr + "-cards").html("");
  }

  getTotal() {
    let points = 0;
    let aces = 0;

    points = this.hand.reduce((accum, card) => {
      if (card.isAce()) { aces++ };
      return accum + card.getValue();
    }, 0);

    for(let i = 0; i < aces; i++) {
      if (points > 21) { points -= 10 };
    }

    return points;
  }

  busted() {
    return this.getTotal() > 21;
  }

  blackjack() {
    return this.getTotal() === 21;
  }

  canSplit() {
    if(this.hand.length === 2){
      return this.hand[0].value === this.hand[1].value;
    } else {
      return false;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cards_card__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(3);



class Dealer extends __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] {
  constructor(deck) {
    super("dealer");
    this.deck = deck;
  }

  makeStartingMove() {
    let firstCard = this.deck.draw();
    let secondCard = this.deck.draw();

    firstCard.faceUp = false;
    this.receiveCard(firstCard);
    this.receiveCard(secondCard);
  }


  makeMove() {
    while(this.getTotal() <= 16) {
      this.receiveCard(this.deck.draw());
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dealer);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cards_card__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(3);



class HumanPlayer extends __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */] {
  constructor(deck) {
    super("player");
    this.deck = deck;
    this.chipCount = 2000;
    this.currentBet = 0;
  }

  resetChipCount() {
    this.chipCount = 2000;
    this.currentBet = 0;
    $('.current-bet').html("Current Bet: " + this.currentBet);
    $('.chip-count').html("Total Chips: " + this.chipCount);
  }

  updateChipCount(win) {
    this.chipCount += win ? this.currentBet : -1 * this.currentBet;
    this.currentBet = 0;
    $('.current-bet').html("Current Bet: " + this.currentBet);
    $('.chip-count').html("Total Chips: " + this.chipCount);
  }

  resetCurrentBet() {
    this.currentBet = 0;
    $('.current-bet').html("Current Bet: " + this.currentBet);
  }

  setCurrentBet(currentBet) {
    if(this.chipCount - (this.currentBet + currentBet) < 0) {
      throw new Error("Not enough funds!")
    } else {
      this.currentBet += currentBet;
      $('.current-bet').html("Current Bet: " + this.currentBet);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HumanPlayer);


/***/ })
/******/ ]);