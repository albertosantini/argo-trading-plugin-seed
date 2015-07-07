"use strict";

var assert = require("assert");

var rsi = require("../lib/indicators/rsi");

describe("rsi", function () {
    // Figures from http://investexcel.net/relative-strength-index-spreadsheet/
    var series = [
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

    it("test series", function () {
        var rsiSeries = rsi(series, 14);

        assert.equal(69.45551128818062, rsiSeries.rsi[0]);
        assert.equal(61.76978286544929, rsiSeries.rsi[1]);
        assert.equal(58.18341002297398, rsiSeries.rsi[2]);
    });

    it("test next", function () {
        var rsiNext = rsi(46.76, 14, 47.21,
            0.3468877551020406, 0.21469387755102004);

        assert.equal(58.18341002297398, rsiNext.rsi);
    });
});
