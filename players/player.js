import Card from '../cards/card';

class Player {
  constructor(playerStr) {
    this.hand = [];
    this.playerStr = playerStr;
  }

  receiveCard(newCard) {
    this.hand.push(newCard);
    $("." + this.playerStr + "-cards").append("<img src=./card_images/" + newCard.getImageUrl() + "></img>")
  }

  clearHand(playerStr) {
    this.hand = [];
    this.containsAce = false;
    $("." + this.playerStr + "-cards").clear();
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
}

export default Player;
