// /*----- constants -----*/
var suits = ['s', 'c', 'd', 'h'];
var numb = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
var cards;

// /*----- app's state (variables) -----*/
var deck;
var playerCard; // what cards are being held by a player
var dealerCard; //what cards are being held by a dealer
var cardCount; // which card I'm at within the deck

// /*----- cached element references -----*/
var outputMessage = document.getElementById('outputMessage'); // give a better name to output
var dealerHolder = document.getElementById('dealerHolder');
var playerHolder = document.getElementById('playerHolder')

// /*----- event listeners -----*/
document.getElementById('btnstart')
    .addEventListener('click', function() {
        init();
        render();
    });

/*----- functions -----*/

function buildDeck() {
    cards = [];
    for (suit of suits) {
        numb.forEach(function(face) {
            var cardValue;
            if (isNaN(parseInt(face))) {
                cardValue = face === 'A' ? 11 : 10;
            } else {
                cardValue = parseInt(face);
            }
            var card = {
                display: suit + face,
                cardvalue: cardValue
            }
            cards.push(card);
        });
    }
}

// init function
function init() { 
    shuffleDeck();
    newDeal();
   
}
// when something is displayed out it in render
//create and array of divs and display them dynamically(jQuery)
function render() {
    document.getElementById('dealerCard1').className += ' ' + dealerCard[0].display;
    document.getElementById('playerCard1').className += ' ' + playerCard[0].display;
    document.getElementById('dealerCard2').className += ' ' + dealerCard[1].display;
    document.getElementById('playerCard2').className += ' ' + playerCard[1].display;
}

// new deal
function newDeal() {
    playerCard = [];
    dealerCard = [];
    dealerHolder.innerHTML = '';
    playerHolder.innerHTML = '';
    cardCount = 0;
    for (x = 0; x < 2; x++) {
        //
        dealerCard.push(deck[cardCount]);
        // dealerHolder.innerHTML += displayCards(cardCount);
        cardCount++
        playerCard.push(deck[cardCount]);
        // playerHolder.innerHTML += displayCards(cardCount);
        cardCount++
    }
    console.log(dealerCard);
    console.log(playerCard);
}

// display cards on screen
function displayCards() {



}

// shuffle cards
function shuffleDeck() {
    buildDeck();
    deck = [];
    while (cards.length) {
        deck.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }
}

init();
render();