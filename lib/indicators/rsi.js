"use strict";

module.exports = rsi;

function rsi(closes, period, close0, avgGain, avgLoss) {
    var rsis = [],
        avgGains = [],
        avgLosses = [];

    if (close0 && avgGain && avgLoss) {
        return rsiNext(closes, period, close0, avgGain, avgLoss);
    }

    avgGain = 0;
    avgLoss = 0;

    closes.forEach(function (close, i) {
        var change,
            res;

        if (i > 0 && i <= period) {
            change = closes[i] - closes[i - 1];
            if (change > 0) {
                avgGain += change;
            }
            if (change < 0) {
                avgLoss += -change;
            }
            if (i === period) {
                avgGain = avgGain / period;
                avgLoss = avgLoss / period;

                rsis.push(100 - (100 / (1 + (avgGain / avgLoss))));
                avgGains.push(avgGain);
                avgLosses.push(avgLoss);
            }
        }

        if (i > period) {
            res = rsiNext(close, period, closes[i - 1], avgGain, avgLoss);

            rsis.push(res.rsi);
            avgGains.push(res.avgGain);
            avgLosses.push(res.avgLoss);

            avgGain = res.avgGain;
            avgLoss = res.avgLoss;
        }
    });

    return {
        rsi: rsis,
        avgGain: avgGains,
        avgLoss: avgLosses
    };
}

function rsiNext(close, period, close0, avgGain, avgLoss) {
    var change = close - close0,
        up = 0,
        down = 0,
        alpha = 1 / period, // Wilder
        rs;

    if (change > 0) {
        up = change;
    }
    if (change < 0) {
        down = -change;
    }

    avgGain = alpha * up + (1 - alpha) * avgGain;
    avgLoss = alpha * down + (1 - alpha) * avgLoss;

    rs = avgGain / avgLoss;

    return {
        rsi: 100 - (100 / (1 + rs)),
        avgGain: avgGain,
        avgLoss: avgLoss
    };
}
