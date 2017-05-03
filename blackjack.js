import Card from './cards/card';
import Deck from './cards/deck';
import Player from './players/player';

window.Card = Card;
window.Deck = Deck;

$(document).ready(function() {
  let deck = new Deck();
  let player = new Player();

  player.receiveCard(deck.draw());
  player.receiveCard(deck.draw());
  window.player = player;
});
