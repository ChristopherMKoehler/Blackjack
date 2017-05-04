import Card from '../cards/card';
import Player from './player';

class HumanPlayer extends Player {
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

  setCurrentBet(currentBet) {
    if(this.chipCount - (this.currentBet + currentBet) < 0) {
      throw new Error("Not enough funds!")
    } else {
      this.currentBet += currentBet;
      $('.current-bet').html("Current Bet: " + this.currentBet);
    }
  }
}

export default HumanPlayer;
