"use strict";

module.exports = rsi;

var ema = require("./ema");

function rsi(closes, period, close0, avgGain, avgLoss) {
    var hist,
        rsis = [];

    if (close0 && avgGain && avgLoss) {
        return rsiNext(closes, period, close0, avgGain, avgLoss);
    }

    avgGain = 0;
    avgLoss = 0;

    hist = closes.slice(0, period);
    closes = closes.slice(period);

    hist.forEach(function (close, i) {
        var change;

        if (i === 0) {
            return;
        }

        change = hist[i] - hist[i - 1];
        if (change > 0) {
            avgGain += change;
        }
        if (change < 0) {
            avgLoss += -change;
        }
    });

    avgGain = avgGain / period;
    avgLoss = avgLoss / period;

    closes.forEach(function (close, i) {
        var res;

        if (i === 0) {
            res = rsiNext(close, period, hist[period - 1], avgGain, avgLoss);
        } else {
            res = rsiNext(close, period, closes[i - 1], avgGain, avgLoss);
        }

        avgGain = res.avgGain;
        avgLoss = res.avgLoss;

        rsis.push(res);
    });

    return rsis;
}

function rsiNext(close, period, close0, avgGain, avgLoss) {
    var change = close - close0,
        up = 0,
        down = 0,
        rs;

    if (change > 0) {
        up = change;
    }
    if (change < 0) {
        down = -change;
    }

    avgGain = ema(up, period, avgGain);
    avgLoss = ema(down, period, avgLoss);

    rs = avgGain / avgLoss;

    return {
        rsi: 100 - (100 / (1 + rs)),
        close: close,
        avgGain: avgGain,
        avgLoss: avgLoss
    };
}
