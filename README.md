## Blackjack
[Blackjack live][heroku]

[heroku]: http://www.christopherkoehler.me/Blackjack


[heroku]: http://www.christopherkoehler.me/Blackjack
This is an application that allow the user to play the classic card game, Blackjack.
It is written in JavaScript and uses jQuery for DOM manipulation.

### Instructions

![image of the bet buttons](./screenshots/bet-buttons.PNG)

1) Place your bet using the buttons at the bottom-right of the screen (shown above). Each player starts the game with a total of 2000 chips. The user can press a button multiple times to add that amount that many times to their current bet. There is also a clear bet button to reset your current bet back to zero if you misclicked.

2) You will be dealt two cards and the dealer, whose cards are at the top of the screen, will also be dealt two cards but one of them will be facedown. You will be offered the options to hit or stand. If you have enough chips you can either double down or split, which will double your bet. If your cards sum to less than 12, you can double down, which will give you one more card and allow the dealer to go. If you have two cards of the same value, say two tens, you will be given the option to split. This will create two hands, with each hand containing one of the tens from the original hand. The user will then be able to iterate through the hands with custom hand functionalty.

3) After you are done with your hand, you busted (sum of cards > 21), or you hit Blackjack (sum of cards = 21), the dealer will flip their facedown card and draw until they hit a score over 16 or they bust.

4) After the dealer goes, you will either have your bet added or subtracted from your chip count. If you run out of chips, the game will reset you back to the initial chip count of 2000.

### Implementation

This game uses object-oriented programming for most of its structure. The following are some important notes

#### Card

The card is responsible for keeping track of the value and suit of a card, ex. value = "king", suit = "diamonds". It is also responsible for generating the deck. The class has two constant JavaScript objects associated with it named values and suits which hold the four suits and 13 values of a real deck of playing cards.

```javascript
static generateDeck() {
  let cardArray = [];
  suits.forEach((suit) => {
    Object.keys(values).forEach((value) => cardArray.push(new Card(value, suit)))
  })
  return Card.shuffle(cardArray);
}

static shuffle(cardArray) {
  let x, j;
  for(let i = cardArray.length; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let x = cardArray[i - 1];
    cardArray[i - 1] = cardArray[j];
    cardArray[j] = x;
  }
  return cardArray;
}
```

The card class also generates the image url of each card. The images of the cards are formatted to be predictable so the card can easily generate the path for each card.

```javascript

getImageUrl() {
  return this.value + "_of_" + this.getSuit() + ".png";
}

```

#### Deck

Deck allows the program to draw from the deck generated by Card.


#### Player

Player is the parent class for the two classes, Dealer and HumanPlayer. It keeps track of the player's hand, which is stored as an array of arrays of cards. This is done so when the player splits, the class is prepared to handle multiple hands.

The two big functions in this class are receiveCard and getTotal. receiveCard is responsible for taking a card in, pushing that card onto the correct hand, and then use jQuery to add the picture of that card on to the correct element. This is how it will render the player's hand.

```javascript

if(this.playerStr === "player") {
  $(".player-cards").html("");
  this.hand.forEach((hand) => {
    $(".player-cards").append("<div class=hand></div>");
    hand.forEach((card) =>
      $(".player-cards div:last-child")
        .append("<img id=" + id + " src=./card_images/" + card.getImageUrl() + "></img>")
    );
  })
}
```

getTotal does what it sounds like it does, it sums the card's values and returns the total. In order to make winning comparisons easier, when the player busts, the total is set to -1.

```javascript
return points > 21 ? -1 : points;
```

This makes it such that all one needs to do in order to determine the winner is see which total between the two players is greater.

#### Dealer and HumanPlayer

These two classes are specializations of the Player class. The primary difference is that the Dealer can not split or double down and does not have chips. This makes the coding of it simple in that all it needs to do is take two cards for its initial move and then, once the player is done, keep hitting until they bust or they have a total greater than 16.

HumanPlayer's main difference is that it must handle betting. This is done with two class instance variables called currentBet and chipCount. The program offers the ability to reset and update both the chipCount and the currentBet.

HumanPlayer also determines whether or not the player can split or double down. It compares the chipCount to the bet to see if they can afford to do these actions, and then, it checks to see if the cards meet the necessary criteria. HumanPlayer's final responsibility is to handle a split which breaks the current hand in two and sets two separate arrays which each have one card from the original hand and a new card drawn from the deck.

```javascript
  this.hand.push([this.hand[idx].pop()]);
  this.receiveCard(this.deck.draw(), idx);
  this.receiveCard(this.deck.draw(), this.hand.length - 1);
```

#### Playing the game

The game uses all of the functions given by the described classed to implement event listeners that control the games structure.



### Enjoy!
