"use strict";

var util = require("util");

module.exports = ontick;

// http://developer.oanda.com/rest-live/streaming/#streaming
function ontick(tick) {
    util.log(tick.time, tick.instrument, tick.bid, tick.ask);
}
