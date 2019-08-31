"use strict";

const assert = require("assert");

const macd = require("../lib/indicators/macd");

describe("macd", () => {

    // Figures from http://investexcel.net/how-to-calculate-macd-in-excel/
    const series = [
        459.99,
        448.85,
        446.06,
        450.81,
        442.80,
        448.97,
        444.57,
        441.40,
        430.47,
        420.05,
        431.14,
        425.66,
        430.58,
        431.72,
        437.87,
        428.43,
        428.35,
        432.50,
        443.66,
        455.72,
        454.49,
        452.08,
        452.73,
        461.91,
        463.58,
        461.14,
        452.08,
        442.66,
        428.91,
        429.79,
        431.99,
        427.72,
        423.20,
        426.21,
        426.98,
        435.69,
        434.33
    ];

    it("test series", () => {
        const macdSeries = macd(series, 12, 26, 9);

        assert.strictEqual(8.275269503907623, macdSeries.macd[0]);
        assert.strictEqual(7.70337838145673, macdSeries.macd[1]);
        assert.strictEqual(6.416074756955879, macdSeries.macd[2]);
        assert.strictEqual(4.2375197832648155, macdSeries.macd[3]);
        assert.strictEqual(2.5525833248657364, macdSeries.macd[4]);
        assert.strictEqual(1.3788857198536562, macdSeries.macd[5]);
        assert.strictEqual(0.10298149119910249, macdSeries.macd[6]);
        assert.strictEqual(-1.2584019528031263, macdSeries.macd[7]);

        assert.strictEqual(3.037525868733945, macdSeries.signal[0]);
        assert.strictEqual(1.9056522293357783, macdSeries.signal[1]);
        assert.strictEqual(1.058708435377633, macdSeries.signal[2]);
        assert.strictEqual(0.4106403253435085, macdSeries.signal[3]);
    });

    it("test next", () => {
        const macdNext = macd(435.69, 12, 26, 9, 434.454416757721, 437.0762590859779, 1.9056522293357783);

        assert.strictEqual(-2.329066740454948, macdNext.macd);
        assert.strictEqual(1.058708435377633, macdNext.signal);
    });
});
