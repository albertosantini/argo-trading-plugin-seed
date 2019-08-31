"use strict";

module.exports = ema;

function ema(closes, period, ema0) {
    let total = 0,
        ema1,
        ema2;

    const emas = [];

    if (ema0) {
        return emaNext(closes, period, ema0);
    }

    const hist = closes.slice(0, period);

    hist.forEach(close => {
        total += parseFloat(close);
    });

    ema2 = total / period;
    emas.push(ema0);
    closes.slice(period).forEach(close => {
        ema1 = emaNext(close, period, ema2);
        emas.push(ema1);
        ema2 = ema1;
    });

    return emas;
}

function emaNext(close, period, ema0) {
    const alpha = 2 / (period + 1);

    return close * alpha + ema0 * (1 - alpha);
}
