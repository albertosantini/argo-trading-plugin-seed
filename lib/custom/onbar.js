"use strict";

const util = require("util");

module.exports = onbar;

function onbar(bar) {
    util.log(bar.time, bar.instrument, bar.granularity, bar.volume);
}
