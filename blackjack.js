import Card from './cards/card';
import Deck from './cards/deck';
import Dealer from './players/dealer';
import HumanPlayer from './players/human_player';

window.Card = Card;
window.Deck = Deck;


$(document).ready(function() {
  let doneBetting = false;

  $('.add-bet').on("click", (e) => {
    player.setCurrentBet(parseInt(e.currentTarget.value));
  })

  $('.done-betting').on("click", () => {
    $('.add-bet').hide();
    $('.done-betting').hide();
    doneBetting = true;
  })

  let deck = new Deck();
  let dealer = new Dealer(deck);
  let player = new HumanPlayer(deck);
  dealer.makeMove();
});
