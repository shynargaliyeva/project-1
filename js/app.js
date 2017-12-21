// /*----- constants -----*/
var suits = ['s', 'c', 'd', 'h'];
var numb = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
var cards;

// /*----- app's state (variables) -----*/
var deck;
var playerHand;
var dealerHand; 
var cardCount; // which card I'm at within the deck
var balance;
var playerScore;
var dealerScore;
var dealersTurn;

// /*----- cached element references -----*/
var $message = document.getElementById('message');
var $dValue = document.querySelector('#dValue');
var $pValue = document.querySelector('#pValue');
// var $balEl = document.querySelector('h5 span');
// var $inputEl = document.querySelector('input');
var $hitBtn = document.getElementById('hit');
var $btnStart = document.getElementById('btnstart')
var $bet = document.getElementById('bet');
var $container2 = document.querySelector('.container2');
var $container1 = document.querySelector('.container1');
var $standBtn = document.getElementById('stand');
var $playerButtons = document.querySelector('.playerButtons');
// /*----- event listeners -----*/
$btnStart.addEventListener('click', function() {
        init();
        render();
});

$bet.addEventListener('click', function() {
//    var  balance = 100;
//    balance -=parseFloat(inputEl.value);
});

$hitBtn.addEventListener('click', function() {
    console.log('hit function run')
    hit(cardCount, playerHand);
    render();
});

$standBtn.addEventListener('click', stand);

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
    dealersTurn = false;
    playerHand = [];
    dealerHand = [];
    cardCount = 0;
    dealerHand.push(deck[cardCount], deck[cardCount + 1]);
    playerHand.push(deck[cardCount + 2], deck[cardCount + 3]);
    cardCount += 4
    playerScore = score(playerHand);
    render();
    $playerButtons.style.display = 'inline-block';

};
// when something is displayed out it in render. adds to DOM
function render() {
    dealersTurn ? displayBoth() : displayOne();
    $pValue.innerText = playerScore;
    $dValue.innerText = dealerScore ? score(dealerHand) : '';
    $message.innerText = winner() ? winner() : 'sup';
    
    if (dealersTurn) $playerButtons.style.display = 'none';

}
// hit function. call when press hit
function hit() {
    playerHand.push(deck[cardCount])
    cardCount+=1
    playerScore = score(playerHand);
}

// display cards
function displayOne() {
    var pEl = '';
    var dEl = '';
    playerHand.forEach(function (card) {
        pEl += `<div class="card ${card.display}"></div>`
    })
    $container2.innerHTML = pEl;

        dEl += `<div class="card ${dealerHand[0].display}"></div>`
        dEl += `<div class="card back-blue"></div>`
 
    $container1.innerHTML = dEl;
};

function displayBoth() {
    var pEl = '';
    var dEl = '';
    playerHand.forEach(function (card) {
        pEl += `<div class="card ${card.display}"></div>`
    })
    $container2.innerHTML = pEl;

    dealerHand.forEach(function (card) {
        dEl += `<div class="card ${card.display}"></div>`
    })
    $container1.innerHTML = dEl;
};

function score(hand) { 
    var score = 0;
    var aceCount = 0;
    for (var i = 0; i < hand.length; i++) {
        if (hand[i].cardvalue === 11) {
            aceCount++;
        }
        score += hand[i].cardvalue;
    }
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }
    return score;
};


// stand button 
function stand() {
    dealersTurn = true;
    getDealerCards();
    dealerScore = score(dealerHand);
    render();
    

}

function getDealerCards() {
    while (score(dealerHand) < 17) {
        dealerHand.push(deck[cardCount])
        cardCount += 1;
    }
}



//  check for win
function winner() {
    var p = playerScore;
    var d = dealerScore;
    if (playerScore > 21 && !dealersTurn) {
        return "Dealer wins!"
    } 
    if (playerHand.length === 2 && playerScore === 21) {
        return "Blackjack!!!"
    }
    if (p === d) {
        return "It's a tie!";
    } else if (p <= 21 && d <= 21) {
        if (p > d) {
            return "You win!";
        } else {
            return "Dealer wins!";
        }
    } else if (p > 21 && d > 21) {
        return "It's a tie!";
    } else if (p > 21 || d > 21) {
        if (d > 21) {
            return "You win!";
        } else {
            return "Dealer wins!";
        }
    }
};


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