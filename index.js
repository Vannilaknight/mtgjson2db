var mongoose = require('mongoose'),
    ProgressBar = require('ascii-progress'),
    userModel = require('./models/Card'),
    cardsCtrl = require('./controllers/cards'),
    formatCtrl = require('./controllers/format'),
    AllSets = require("./AllSets.json");

mongoose.connect('mongodb://localhost:27017/mtgsets');

var totalCount = 0;
for (var set in AllSets) {
    var set = AllSets[set];
    var cards = set.cards;
    totalCount += cards.length;
}

var bar = new ProgressBar({
    schema: ':bar.blue',
    total: totalCount
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    setCards();
});

if (bar.completed) {
    console.log('Failed Cards: ' + cardsCtrl.getFailedCards().failedCards + ' - Duplicate Cards: ' + cardsCtrl.getFailedCards().duplicateCards)
}

var allCards = [];
function setCards() {
    cardsCtrl.reset().then(function (err) {
        console.log(err.toString());
        for (var set in AllSets) {
            var set = AllSets[set];
            var cards = set.cards;

            cards.forEach(function (card) {
                var code = set.code.toLowerCase();
                if (set.magicCardsInfoCode) {
                    code = set.magicCardsInfoCode.toLowerCase();
                }
                card.cardSet = code;
                card.genre = "None";
                card.format = formatCtrl.checkSet(card.cardSet);
                if (card.names) {
                    if (card.names.length > 1) {
                        if (card.name == card.names[0]) {
                            card.secondary = getCard(card.names[1]);
                        }
                    }
                }
            });
            allCards = allCards.concat(cards);
        }

        allCards = allCards.filter(function (card) {
            var ret = true;
            if (card.names) {
                if (card.names.length > 1) {
                    if (card.name == card.names[1]) {
                        ret = false;
                    }
                }
            }
            return ret;
        });
        cardsCtrl.createCards(allCards, bar);
    });
}

function getCard(name) {
    var cardRet = null;
    for (var set in AllSets) {
        var set = AllSets[set];
        var cards = set.cards;
        cards.forEach(function (card) {
            if (card.name == name) {
                cardRet = card;
            }
        });
    }
    return cardRet;
}

