"use strict";

var util = require("util"),
    config = require("../util/config");


module.exports = ontick;

// http://developer.oanda.com/rest-live/streaming/#streaming
function ontick(tick) {
    var time = tick.time,
        instrument = tick.instrument,
        bid = tick.bid,
        ask = tick.ask,
        pip = config.pips[instrument];

    util.log(time, instrument, bid, ask, pip);
}
