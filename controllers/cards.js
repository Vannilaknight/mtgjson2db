var Card = require('mongoose').model('Card');

var failedCards = 0;
var duplicateCards = 0;
var cardCount = 0;

exports.getCards = function() {
    Card.find({}).exec(function(err, collection) {
        console.log(collection);
    })
};

exports.reset = function () {
    return Card.remove({});
};

exports.createCard = function(data, bar) {
    Card.create(data, function(err, card) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Card');
                duplicateCards++;
            } else {
                console.error(err.toString());
                failedCards++;
            }
        }
        bar.tick();
    })
};

exports.getFailedCards = function () {
    return {
        failedCards,
        duplicateCards
    }
};