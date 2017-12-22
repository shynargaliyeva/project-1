// /*----- constants -----*/
var suits = ['s', 'c', 'd', 'h'];
var numb = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
var cards;
var placeholderCards = '<div class="card dummy"></div><div class="card dummy"></div>'

// /*----- app's state (variables) -----*/
var deck;
var playerHand;
var dealerHand; 
var cardCount; // which card I'm at within the deck
var winner;
var balance;
var bet;
var stand;

// /*----- cached element references -----*/
var $message = document.getElementById('message');
var $dValue = document.querySelector('#dValue');
var $pValue = document.querySelector('#pValue');
// var $balEl = document.querySelector('h5 span');
var $inputEl = document.querySelector('input');
var $btnStart = document.getElementById('btnStart')
var $bet = document.getElementById('bet');
var $balance = document.getElementById('balance');
var $betAmount = document.getElementById('betAmount');
var $container2 = document.querySelector('.container2');
var $container1 = document.querySelector('.container1');
var $hitBtn = document.getElementById('hit');
var $standBtn = document.getElementById('stand');
var $betGroup = document.querySelector('.placeBet');

// /*----- event listeners -----*/
$btnStart.addEventListener('click', function() {
    deal();
    render();
});

$bet.addEventListener('click', function() {
    var amount = parseInt($inputEl.value);
    if (balance >= amount) {
        bet += amount;
        balance -= amount;
    }
    render();
});

$hitBtn.addEventListener('click', function() {
    hit(playerHand);
    if (score(playerHand) > 21) {
        winner = 'D';
        bet = 0;
        doPayout(winner);
    }
    render();
});

$standBtn.addEventListener('click', stand);

/*----- functions -----*/

function doPayout(win) {
    switch (win) {
        case 'P': 
            balance += bet * 2;
            break;
        case 'D':
            break;
        case 'B':  // blackjack
            balance += (score(dealerHand) === 21) ? 0 : bet + (bet * 1.5);
            break;
        default:
            balance += bet;
    }
    bet = 0;
};

// build a deck of cards
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
};

// shuffle cards
function shuffleDeck() {
    buildDeck();
    deck = [];
    while (cards.length) {
        deck.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
    }
};

// init function
function init() {
    balance = 100;
    winner = null;
    bet = 0;
};

function deal() {
    shuffleDeck();
    winner = null;
    playerHand = [];
    dealerHand = [];
    cardCount = 0;
    dealerHand.push(deck[cardCount], deck[cardCount + 1]);
    playerHand.push(deck[cardCount + 2], deck[cardCount + 3]);
    cardCount += 4
    stand = false;
    render();
};

// hit function. call when press hit
function hit(hand) {
    hand.push(deck[cardCount])
    cardCount += 1;
}

function render() {
    $balance.innerHTML = `Balance: \$${balance}`;
    $betAmount.innerHTML = `Bet Amount: \$${bet}`;
    $pValue.innerText = score(playerHand);
    $dValue.innerText = winner ? score(dealerHand) : '';
    // hide/show controls
    $btnStart.style.visibility = (winner || !dealerHand) && bet ? 'visible' : 'hidden';
    $standBtn.style.visibility = $hitBtn.style.visibility = winner ? 'hidden' : 'visible';
    $betGroup.style.visibility = winner || !dealerHand ? 'visible' : 'hidden';
    // TODO: hide/show doubleBtn
    renderHands();
    renderMessage();
};

function renderMessage() {
    switch (winner) {
        case 'P':
            $message.innerHTML = "Player Wins 🤑";
            break;
        case 'D':
            $message.innerHTML = "Dealer Wins 😈";
            break;
        case 'B':  // blackjack
            $message.innerHTML = (score(dealerHand) === 21 ? 'Dealer' : 'Player') + ' has Blackjack!';
            break;
        case 'T':
            $message.innerHTML = "It's a Push 👻";
            break;
        default:
            if (!winner && dealerHand) {
                $message.innerHTML = "Stand or Hit 🤷🏻‍♀";
            } else {
                $message.innerHTML = "Place your Bet 🤷🏻‍♀";
            }
    }
}

// display cards
function renderHands() {
    if (dealerHand) {
        var pEl = '';
        var dEl = '';
        playerHand.forEach(function (card) {
            pEl += `<div class="card ${card.display}"></div>`
        });
        $container2.innerHTML = pEl;
        dealerHand.forEach(function (card, idx) {
            if (idx === 1 && !winner) {
                dEl += `<div class="card back-blue"></div>`
            } else {
                dEl += `<div class="card ${card.display}"></div>`
            }
        });
        $container1.innerHTML = dEl;
    } else {
        // no hands dealt yet (just loaded)
        $container1.innerHTML = placeholderCards;
        $container2.innerHTML = placeholderCards;
    }
}

// get score
function score(hand) {
    if (!hand) return '';
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
    stand = true;
    getDealerCards();
    winner = getWinner();
    render();
}

// called when player hits "stand"
function getDealerCards() {
    while (score(dealerHand) < 17) {
        hit(dealerHand);
    }
}

//  check for win
function getWinner() {
    var win;
    var p = score(playerHand);
    var d = score(dealerHand);
    if ((playerHand.length === 2 && p === 21) || (dealerHand.length === 2 && d === 21)) {
        win = 'B';
        doPayout(win);
        return win;
    } else if (stand) {
        if (p === d) win = 'T';
        win = p > d ? 'P' : 'D';
        doPayout(win);
        return win;
    } else {
        return null;
    }
};

init();
render();