"use strict";

module.exports = macd;

var ema = require("./ema");

/*eslint-disable max-len */
function macd(closes, slowPeriod, fastPeriod, signalPeriod, slowPeriod0, fastPeriod0, signalPeriod0) {
/*eslint-enable */
    var macd1,
        ema1,
        ema2,
        signal;

    slowPeriod = slowPeriod || 12;
    fastPeriod = fastPeriod || 26;
    signalPeriod = signalPeriod || 9;

    if (slowPeriod0 && fastPeriod0 && signalPeriod0) {
        ema1 = ema(closes, slowPeriod, slowPeriod0);
        ema2 = ema(closes, fastPeriod, fastPeriod0);
        macd1 = ema1 - ema2;
        signal = ema(macd1, signalPeriod, signalPeriod0);
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
