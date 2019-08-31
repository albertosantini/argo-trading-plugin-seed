"use strict";

module.exports = rsi;

function rsi(closes, period, close0, avgGain = 0, avgLoss = 0) {
    const rsis = [],
        avgGains = [],
        avgLosses = [];

    if (close0 && avgGain && avgLoss) {
        return rsiNext(closes, period, close0, avgGain, avgLoss);
    }

    let avgGain1 = 0;
    let avgLoss1 = 0;

    closes.forEach((close, i) => {
        let change,
            res;

        if (i > 0 && i <= period) {
            change = closes[i] - closes[i - 1];
            if (change > 0) {
                avgGain1 += change;
            }
            if (change < 0) {
                avgLoss1 += -change;
            }
            if (i === period) {
                avgGain1 /= period;
                avgLoss1 /= period;

                rsis.push(100 - (100 / (1 + (avgGain1 / avgLoss1))));
                avgGains.push(avgGain1);
                avgLosses.push(avgLoss1);
            }
        }

        if (i > period) {
            res = rsiNext(close, period, closes[i - 1], avgGain1, avgLoss1);

            rsis.push(res.rsi);
            avgGains.push(res.avgGain);
            avgLosses.push(res.avgLoss);

            avgGain1 = res.avgGain;
            avgLoss1 = res.avgLoss;
        }
    });

    return {
        rsi: rsis,
        avgGain: avgGains,
        avgLoss: avgLosses
    };
}

function rsiNext(close, period, close0, avgGain, avgLoss) {
    const change = close - close0;
    const alpha = 1 / period; // Wilder

    let up = 0,
        down = 0;

    if (change > 0) {
        up = change;
    }
    if (change < 0) {
        down = -change;
    }

    const avgGain1 = alpha * up + (1 - alpha) * avgGain;
    const avgLoss1 = alpha * down + (1 - alpha) * avgLoss;

    const rs = avgGain1 / avgLoss1;

    return {
        rsi: 100 - (100 / (1 + rs)),
        avgGain: avgGain1,
        avgLoss: avgLoss1
    };
}
