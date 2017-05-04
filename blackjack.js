import Card from './cards/card';
import Deck from './cards/deck';
import Dealer from './players/dealer';
import HumanPlayer from './players/human_player';

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
  $("#dd").hide();
  player.updateChipCount(winner === player);
  $('.winner').html(winner === player ? "You win!" : "You Lose!");
  $('.play-action').hide();
  $('.split').remove();
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

  if(playerTotal > dealerTotal || dealer.busted()) {
    handleWin(player);
  } else if(playerTotal === dealerTotal) {
    player.resetCurrentBet()
    $('.winner').html("You tied!");
    $('.play-action').hide();
    $('.end-game').show();
  } else {
    handleWin(dealer);
  }
}

$(document).ready(function() {
  $('#dd').hide();
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

    if(player.blackjack()) {
      handleWin(player)
    } else if(player.canSplit()) {
      $('.player-actions').append("<button class=split>Split</button>");
    } else if(player.canDoubleDown()) {
      $('#dd').show();
    } else {
      $("#dd").hide();
    }
  })

  $('.play-action').on("click", (e) => {
    $("#dd").hide();
    if(e.currentTarget.value === "hit") {
      player.receiveCard(deck.draw());
      if(player.busted()) {
        $("#card").flip(true);
        handleWin(dealer);
      } else if(player.blackjack()) {
        handleWin(player);
      }
    } else {
      $("#card").flip(true);
      dealer.makeMove();
      declareWinner();
    }
  })

  $('.play-again').on("click", () => playAgain());

  $("#dd").on("click", () => {
    player.receiveCard(deck.draw());
    player.doubleCurrentBet();
    $("#card").flip(true);
    dealer.makeMove();
    declareWinner();
  })
});
