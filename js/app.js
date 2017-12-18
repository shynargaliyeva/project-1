// /*----- constants -----*/
var cards = [];
var playerCard = [];
var dealerCard = [];
var cardCount = 0;
var suits = ['spades', 'clubs', 'diamonds', 'hearts'];
var numb = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// /*----- app's state (variables) -----*/

// /*----- cached element references -----*/
var output = document.getElementById('output');
var dealerHolder = document.getElementById('dealerHolder');
var playerHolder = document.getElementById('playerHolder')

// /*----- event listeners -----*/
document.getElementById('btnstart')
    .addEventListener('click', init);

/*----- functions -----*/
for(s in suits) {
    var suit = suits[s][0].toUpperCase();
    var bgcolor = (suit == 'H' || suit == 'D') ? 'red' : 'black';
    for(n in numb) {
        var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
        var card = {
        suit: suit,
        icon: suits[s],
        bgcolor: bgcolor,
        cardnum: numb[n],
        cardvalue: cardValue
    }
    cards.push(card);
    }
}

// init function
function init() { 
    shuffleDeck(cards);
    newDeal();
   
}

// new deal
function newDeal() {
    playerCard = [];
    dealerCard = [];
    dealerHolder.innerHTML = '';
    playerHolder.innerHTML = '';
    for (x = 0; x < 2; x++) {
        dealerCard.push(cards[cardCount]);
        // dealerHolder.innerHTML += cardOutput(cardCount);
        cardCount++
        playerCard.push(cards[cardCount]);
        // playerHolder.innerHTML += cardOutput(cardCount);
        cardCount++
    }
    console.log(dealerCard);
    console.log(playerCard);
}

// display cards on screen
function cardOutput() {



}

// shuffle deck
function shuffleDeck(array) {
    for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j]; //random value of i to j
        array[j] = temp;
    }
    return array;
}

