"use strict";

module.exports = macd;

var ema = require("./ema");

function macd(closes, slowPeriod, fastPeriod, signalPeriod,
    ema01, ema02, ema03) {
    var macd1,
        ema1,
        ema2,
        signal;

    slowPeriod = slowPeriod || 12;
    fastPeriod = fastPeriod || 26;
    signalPeriod = signalPeriod || 9;

    if (ema01 && ema02 && ema03) {
        ema1 = ema(closes, slowPeriod, ema01);
        ema2 = ema(closes, fastPeriod, ema02);
        macd1 = ema1 - ema2;
        signal = ema(macd1, signalPeriod, ema03);
    } else {
        macd1 = [];
        ema1 = ema(closes, slowPeriod);
        ema2 = ema(closes, fastPeriod);
        ema2.forEach(function (ema0, index) {
            var n1 = ema1.length,
                n2 = ema2.length;

            macd1[index] = ema1[n1 - n2 + index] - ema2[index];
        });
        signal = ema(macd1, signalPeriod);
    }

    return {
        macd: macd1,
        ema1: ema1,
        ema2: ema2,
        signal: signal
    };
}
