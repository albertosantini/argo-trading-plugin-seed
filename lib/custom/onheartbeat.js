"use strict";

var util = require("util");

module.exports = onheartbeat;

function onheartbeat(beat) {
    // only for demo: it would be better a no-op function
    util.log(beat.time);
}
