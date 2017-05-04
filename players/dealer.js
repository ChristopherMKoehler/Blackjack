import Card from '../cards/card';
import Player from './player';

class Dealer extends Player {
  constructor(deck) {
    super("dealer");
    this.deck = deck;
  }

  makeMove() {
    while(this.getTotal() <= 16) {
      this.receiveCard(this.deck.draw());
    }
  }
}

export default Dealer;
