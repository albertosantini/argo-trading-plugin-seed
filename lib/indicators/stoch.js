"use strict";

module.exports = stoch;

function stoch(closes, highs, lows, kPeriod, dPeriod) {
    var ks = [],
        ds = [];

    closes.forEach(function (close, i) {
        var wCloses,
            wHighs,
            wLows,
            lastClose,
            periodLow,
            periodHigh,
            kValue,
            dValue,
            wKs;

        if (i >= kPeriod - 1) {
            wCloses = closes.slice(i + 1 - kPeriod, i + 1);
            wHighs = highs.slice(i + 1 - kPeriod, i + 1);
            wLows = lows.slice(i + 1 - kPeriod, i + 1);
            lastClose = wCloses.slice(-1);

            periodHigh = Math.max.apply(null, wHighs);
            periodLow = Math.min.apply(null, wLows);

            kValue = ((lastClose - periodLow) / (periodHigh - periodLow)) * 100;
            ks.push(kValue);

            if (ks.length >= dPeriod) {
                wKs = ks.slice(-dPeriod);

                dValue = wKs.reduce(function (prev, curr) {
                    return prev + curr;
                }) / dPeriod;

                ds.push(dValue);
            } else {
                ds.push(null);
            }
        }
    });

    return {
        k: ks,
        d: ds
    };
}
