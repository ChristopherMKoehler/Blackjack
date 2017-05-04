import Card from './cards/card';
import Deck from './cards/deck';
import Dealer from './players/dealer';
import HumanPlayer from './players/human_player';

//get the bet
//deal cards 1 face down, 1 face up for dealer, both face up for player
//take input to hit, stand or double down
//run through dealer cards
//display winner
let deck = new Deck();
let dealer = new Dealer(deck);
let player = new HumanPlayer(deck);
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
    if(player.blackjack()) { handleWin(player) }
  })

  $('.play-action').on("click", (e) => {
    if(e.currentTarget.value === "hit") {
      player.receiveCard(deck.draw());
      if(player.busted()) {
        handleWin(dealer);
      } else if(player.blackjack()) {
        handleWin(player);
      }
    } else {
      $("#card").flip();
      dealer.makeMove();
      declareWinner();
    }
  })

  $('.play-again').on("click", () => playAgain());
});
