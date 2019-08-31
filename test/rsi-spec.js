"use strict";

const assert = require("assert");

const rsi = require("../lib/indicators/rsi");

describe("rsi", () => {

    // Figures from http://investexcel.net/relative-strength-index-spreadsheet/
    const series = [
        45.15,
        46.26,
        46.50,
        46.23,
        46.08,
        46.03,
        46.83,
        47.69,
        47.54,
        49.25,
        49.23,
        48.20,
        47.57,
        47.61,
        48.08,
        47.21,
        46.76
    ];

    it("test series", () => {
        const rsiSeries = rsi(series, 14);

        assert.strictEqual(69.45551128818062, rsiSeries.rsi[0]);
        assert.strictEqual(61.76978286544929, rsiSeries.rsi[1]);
        assert.strictEqual(58.18341002297398, rsiSeries.rsi[2]);
    });

    it("test next", () => {
        const rsiNext = rsi(46.76, 14, 47.21,
            0.3468877551020406, 0.21469387755102004);

        assert.strictEqual(58.18341002297398, rsiNext.rsi);
    });
});
