var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
    artist: String,
    cmc: Number,
    colorIdentity: [String],
    colors: [String],
    flavor: String,
    id: String,
    imageName: String,
    layout: String,
    manaCost: String,
    mciNumber: String,
    name: String,
    names: [String],
    number: String,
    power: String,
    rarity: String,
    subtypes: [String],
    text: String,
    toughness: String,
    type: String,
    types: [String],
    cardSet: String,
    format: [String],
    genre: [String],
    banned: {
        format: Boolean
    },
    secondary: {
        artist: String,
        cmc: Number,
        colorIdentity: [String],
        colors: [String],
        flavor: String,
        id: String,
        imageName: String,
        layout: String,
        manaCost: String,
        mciNumber: String,
        name: String,
        names: [String],
        number: String,
        power: String,
        rarity: String,
        subtypes: [String],
        text: String,
        toughness: String
    }
});

var Card = mongoose.model('Card', cardSchema);