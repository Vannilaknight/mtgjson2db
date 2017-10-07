var standard = require('../rules/standard.json'),
    modern = require('../rules/modern.json');

exports.checkSet = function (set) {
    return [formatSearch(standard, set) ? "standard" : "", formatSearch(modern, set) ? "modern" : ""];
};

function formatSearch(format, set) {
    var found = false;
    format.sets.forEach(function (standardSet) {
        if (set.toLowerCase() == standardSet.toLowerCase()) {
            found = true;
        }
    });
    return found;
}