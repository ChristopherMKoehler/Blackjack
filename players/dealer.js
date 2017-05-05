import Card from '../cards/card';
import Player from './player';

class Dealer extends Player {
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
    while(this.getTotal() <= 16 && this.getTotal() != -1) {
      this.receiveCard(this.deck.draw());
    }
  }
}

export default Dealer;
