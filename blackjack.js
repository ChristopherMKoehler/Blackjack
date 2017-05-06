import Card from './cards/card';
import Deck from './cards/deck';
import Dealer from './players/dealer';
import HumanPlayer from './players/human_player';

let deck = new Deck();
let dealer = new Dealer(deck);
let player = new HumanPlayer(deck);
let winner = null;
let currentHandIndex = 0;
let dd = {};

const resetHands = () => {
  dealer.clearHand("dealer");
  player.clearHand("player");
}

const showCorrectButtons = () => {
  $(".split, #dd").hide();
  if(player.canSplit(currentHandIndex)) {
    $(".split").show();
  }
  if(player.canDoubleDown(currentHandIndex)) {
    $("#dd").show();
  }
}

const isLastHand = () => {
  return currentHandIndex == player.hand.length - 1;
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

  $('.winner').html(winner === player ? "You win!" : "You Lose!");
  $('.play-action').hide();
  $('.split').hide();
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
  $("#dd").hide();
  $(".split").hide();
  let netChipDifference = 0;
  let dealerTotal = dealer.getTotal();
  let currentBet;
  player.hand.forEach((hand, idx) => {
    currentBet = dd[idx] ? player.currentBet * 2 : player.currentBet;
    if(player.getTotal(idx) > dealer.getTotal()) {
      netChipDifference += currentBet;
    } else if (player.getTotal(idx) < dealer.getTotal()) {
      netChipDifference -= currentBet;
    }
  })

  player.updateChipCount(netChipDifference);

  if(netChipDifference > 0) {
    handleWin(player);
  } else if(netChipDifference === 0) {
    player.resetCurrentBet()
    $('.winner').html("You broke even!");
    $('.play-action').hide();
    $('.end-game').show();
  } else {
    handleWin(dealer);
  }
}

$(function() {
  $('#dd').hide();
  $('.end-game').hide();
  $('.play-action').hide();
  // $(".split").hide();

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
      declareWinner();
    } else if(player.canSplit(currentHandIndex)) {
      $(".split").show();
    } else if(player.canDoubleDown(currentHandIndex)) {
      $('#dd').show();
    } else {
      $("#dd").hide();
    }
  })

  $('.play-action').on("click", (e) => {
    $("#dd").hide();
    $(".split").hide();
    if(e.currentTarget.value === "hit") {
      player.receiveCard(deck.draw(), currentHandIndex);
      if(player.busted(currentHandIndex)) {
        if(isLastHand()){
          $("#card").flip(true);
          declareWinner();
        } else {
          currentHandIndex++;
          showCorrectButtons();
        }
      } else if(player.blackjack()) {
        if(isLastHand()) {
          declareWinner();
        } else {
           currentHandIndex++;
           showCorrectButtons();
        }
      }
    } else {
      if(isLastHand()) {
        $("#card").flip(true);
        dealer.makeMove();
        declareWinner();
      } else {
        currentHandIndex++;
        showCorrectButtons();
      }
    }
  })

  $('.play-again').on("click", () => playAgain());

  $("#dd").on("click", () => {
    player.receiveCard(deck.draw(), currentHandIndex);
    dd[currentHandIndex] = true;

    if(isLastHand()) {
      $("#card").flip(true);
      dealer.makeMove();
      declareWinner();
    } else {
      currentHandIndex++;
      showCorrectButtons();
    }

  })

  $(".split").on("click", () => {
    player.handleSplit(currentHandIndex);
    showCorrectButtons();
  });
});
