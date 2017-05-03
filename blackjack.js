import Card from './cards/card';
import Deck from './cards/deck';

window.Card = Card;
window.Deck = Deck;

let deck = new Deck();

$(document).ready(function() {
  $(".player-cards").append("<img src=./card_images/" + deck.cards[0].getImageUrl() + "></img>");
});
