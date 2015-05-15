"use strict";

var util = require("util");

module.exports = ontransaction;

// http://developer.oanda.com/rest-live/streaming/#eventsStreaming
function ontransaction(transaction) {
    var t = transaction;

    util.log(t.time, t.id, t.type, t.instrument, t.pl, t.accountBalance);
}
