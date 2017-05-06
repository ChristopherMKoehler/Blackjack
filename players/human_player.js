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

  updateChipCount(diff) {
    this.chipCount += diff;
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

  canSplit(idx = 0) {
    return this.hand[idx][0].value === this.hand[idx][1].value;
  }

  canDoubleDown(idx = 0) {
    if(this.getTotal(idx) <= 11) {
      return this.chipCount - (2 * this.currentBet) >= 0;
    }
  }

  doubleCurrentBet() {
    this.setCurrentBet(this.currentBet);
  }

  handleSplit(idx = 0) {
    this.hand.push([this.hand[idx].pop()]);
    this.receiveCard(this.deck.draw(), idx);
    this.receiveCard(this.deck.draw(), this.hand.length - 1);
  }
}

export default HumanPlayer;
