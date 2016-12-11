"use strict";

var util = require("util");

module.exports = ontransaction;

function ontransaction(transaction) {
    var t = transaction;

    util.log(t.time, t.id, t.type, t.instrument, t.pl);
}
