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



window.Card = __WEBPACK_IMPORTED_MODULE_0__cards_card__["a" /* default */];
window.Deck = __WEBPACK_IMPORTED_MODULE_1__cards_deck__["a" /* default */];

let deck = new __WEBPACK_IMPORTED_MODULE_1__cards_deck__["a" /* default */]();

$(document).ready(function() {
  $(".player-cards").append("<img src=./card_images/" + deck.cards[0].getImageUrl() + "></img>");
});


/***/ })
/******/ ]);