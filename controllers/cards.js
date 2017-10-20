var Card = require('mongoose').model('Card');

var failedCards = 0;
var duplicateCards = 0;
var cardCount = 0;

exports.getCards = function () {
    Card.find({}).exec(function (err, collection) {
        console.log(collection);
    })
};

exports.getCard = function (name) {
    return Card.findOne({"name": name}).exec();
};

exports.reset = function () {
    return Card.remove({});
};

exports.createCards = function (data, bar) {
    Card.collection.insert(data, function (err, docs) {
        if(err) console.error(err.toString());
        console.log('Failed Cards: ' + failedCards + ' - Duplicate Cards: ' + duplicateCards)
    });
};

exports.createCard = function (data, bar) {
    console.log("Creating Card: " + data.name);
    Card.create(data, function (err, card) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Card');
                duplicateCards++;
            } else {
                console.error(err.toString());
                failedCards++;
            }
        }
        bar.tick();
        if (bar.completed) {
            console.log('Failed Cards: ' + failedCards + ' - Duplicate Cards: ' + duplicateCards)
        }
    })
};

exports.getFailedCards = function () {
    return {
        failedCards,
        duplicateCards
    }
};