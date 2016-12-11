"use strict";

var util = require("util"),
    config = require("../util/config");


module.exports = ontick;

function ontick(tick) {
    var time = tick.time,
        instrument = tick.instrument,
        bid = tick.bid,
        ask = tick.ask,
        pip = config.pips[instrument],
        spread = ((ask - bid) / pip).toFixed(1);

    util.log(time, instrument, bid, ask, spread);
}
