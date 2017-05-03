import Card from './card';

class Deck {
  constructor(deck = null) {
    this.cards = deck || Card.generateDeck();
  }

  draw() {
    if(this.cards.length === 0) {
      this.reset();
    }
    return this.cards.pop();
  }

  reset() {
    this.cards = Card.generateDeck();
  }
}

export default Deck;
