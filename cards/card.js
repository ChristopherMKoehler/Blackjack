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

export default Card;
