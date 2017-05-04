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

  canSplit() {
    if(this.hand.length === 2){
      return this.hand[0].value === this.hand[1].value;
    } else {
      return false;
    }
  }

  canDoubleDown() {
    if(this.hand.length === 2 && this.getTotal() <= 11) {
      return this.chipCount - (2 * this.currentBet) >= 0;
    } else {
      return false;
    }
  }

  doubleCurrentBet() {
    this.setCurrentBet(this.currentBet);
  }
}

export default HumanPlayer;
