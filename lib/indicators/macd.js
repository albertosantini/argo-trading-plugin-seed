"use strict";

module.exports = macd;

var ema = require("./ema");

function macd(closes, period1, period2, period3, ema01, ema02, ema03) {
    var macd1,
        ema1,
        ema2,
        signal;

    period1 = period1 || 12;
    period2 = period2 || 26;
    period3 = period3 || 9;

    if (ema01 && ema02 && ema03) {
        ema1 = ema(closes, period1, ema01);
        ema2 = ema(closes, period2, ema02);
        macd1 = ema1 - ema2;
        signal = ema(macd1, period3, ema03);
    } else {
        ema1 = ema(closes, period1);
        ema2 = ema(closes, period2);
        macd1 = ema1 - ema2;
        signal = ema(macd1, period3);
    }

    return {
        macd: macd1,
        ema1: ema1,
        ema2: ema2,
        signal: signal
    };
}
