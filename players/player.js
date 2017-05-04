import Card from '../cards/card';

class Player {
  constructor(playerStr) {
    this.hand = [];
    this.playerStr = playerStr;
  }

  receiveCard(newCard) {
    this.hand.push(newCard);
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
    this.hand = [];
    this.containsAce = false;
    $("." + this.playerStr + "-cards").html("");
  }

  getTotal() {
    let points = 0;
    let aces = 0;

    points = this.hand.reduce((accum, card) => {
      if (card.isAce()) { aces++ };
      return accum + card.getValue();
    }, 0);

    for(let i = 0; i < aces; i++) {
      if (points > 21) { points -= 10 };
    }

    return points;
  }

  busted() {
    return this.getTotal() > 21;
  }

  blackjack() {
    return this.getTotal() === 21;
  }

  canSplit() {
    if(this.hand.length === 2){
      return this.hand[0].getValue() === this.hand[1].getValue();
    } else {
      return false;
    }
  }
}

export default Player;
