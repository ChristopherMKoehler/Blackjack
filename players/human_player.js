import Card from '../cards/card';
import Player from './player';

class HumanPlayer extends Player {
  constructor(deck) {
    super("player");
    this.deck = deck;
    this.chipCount = 2000;
    this.currentBet = 0;
  }

  updateChipCount(win) {
    this.chipCount += win ? this.currentBet : -1 * this.currentBet;
    this.currentBet = 0;
  }

  setCurrentBet(currentBet) {
    if(this.chipCount - (this.currentBet + currentBet) < 0) {
      throw new Error("Not enough funds!")
    } else {
      this.currentBet += currentBet;
      $('.current-bet').html("<h1>" + this.currentBet + "</h1>");
    }
  }
}

export default HumanPlayer;
