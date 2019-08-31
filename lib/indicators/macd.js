"use strict";

module.exports = macd;

const ema = require("./ema");

function macd(closes, slowPeriod = 12, fastPeriod = 26, signalPeriod = 9, slowPeriod0, fastPeriod0, signalPeriod0) {
    let macd1,
        ema1,
        ema2,
        signal;

    if (slowPeriod0 && fastPeriod0 && signalPeriod0) {
        ema1 = ema(closes, slowPeriod, slowPeriod0);
        ema2 = ema(closes, fastPeriod, fastPeriod0);
        macd1 = ema1 - ema2;
        signal = ema(macd1, signalPeriod, signalPeriod0);
    } else {
        macd1 = [];
        ema1 = ema(closes, slowPeriod);
        ema2 = ema(closes, fastPeriod);
        ema2.forEach((ema0, index) => {
            const n1 = ema1.length,
                n2 = ema2.length;

            macd1[index] = ema1[n1 - n2 + index] - ema2[index];
        });
        signal = ema(macd1, signalPeriod);
    }

    return {
        macd: macd1,
        ema1,
        ema2,
        signal
    };
}
