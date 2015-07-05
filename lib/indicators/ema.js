"use strict";

module.exports = ema;

function ema(closes, period, ema0) {
    var hist,
        total = 0,
        ema1,
        emas = [];

    if (ema0) {
        return emaNext(closes, period, ema0);
    }

    hist = closes.slice(0, period);
    closes = closes.slice(period);

    hist.forEach(function (close) {
        total += close;
    });

    ema0 = total / period;
    emas.push(ema0);
    closes.forEach(function (close) {
        ema1 = emaNext(close, period, ema0);
        emas.push(ema1);
        ema0 = ema1;
    });

    return emas;
}

function emaNext(close, period, ema0) {
    var alpha = 2 / (period + 1);

    return close * alpha + ema0 * (1 - alpha);
}
