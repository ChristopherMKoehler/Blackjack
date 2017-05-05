import Card from '../cards/card';

class Player {
  constructor(playerStr) {
    this.hand = [[]];
    this.playerStr = playerStr;
  }

  receiveCard(newCard, idx = 0) {
    this.hand[idx].push(newCard);
    let id = newCard.faceUp ? "faceup" : "facedown";
    if (newCard.faceUp){
      $("." + this.playerStr + "-cards").append("<img id=" + id + " src=./card_images/" + newCard.getImageUrl() + "></img>");
    } else {
      $("." + this.playerStr + "-cards").append(
      "<div id=card><div class=front><img src=./card_images/facedown.png></img> </div> <div class=back><img src=./card_images/" + newCard.getImageUrl() + "></img></div></div>"
      );
    }

  }

  clearHand(playerStr) {
    this.hand = [[]];
    this.containsAce = false;
    $("." + this.playerStr + "-cards").html("");
  }

  getTotal(idx = 0) {
    let points = 0;
    let aces = 0;

    points = this.hand[idx].reduce((accum, card) => {
      if (card.isAce()) { aces++ };
      return accum + card.getValue();
    }, 0);

    for(let i = 0; i < aces; i++) {
      if (points > 21) { points -= 10 };
    }

    return points > 21 ? -1 : points;
  }

  busted(idx = 0) {
    return this.getTotal(idx) === -1;
  }

  blackjack(idx = 0) {
    return this.getTotal(idx) === 21;
  }
}

export default Player;
