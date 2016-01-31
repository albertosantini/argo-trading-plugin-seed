"use strict";

var assert = require("assert");

var stoch = require("../lib/indicators/stoch");

describe("stoch", function () {
    // Figures from http://investexcel.net/how-to-calculate-the-stochastic-oscillator/
    var highs = [
        1565.55,
        1579.58,
        1583,
        1592.64,
        1585.78,
        1596.65,
        1597.57,
        1597.55,
        1598.6,
        1618.46,
        1619.77,
        1626.03,
        1632.78,
        1635.01,
        1633.7,
        1636,
        1651.1,
        1661.49,
        1660.51,
        1667.47,
        1672.84
    ];

    var lows = [
        1548.19,
        1562.5,
        1575.8,
        1578.93,
        1577.56,
        1582.34,
        1586.5,
        1581.28,
        1582.77,
        1597.6,
        1614.21,
        1616.64,
        1622.7,
        1623.09,
        1623.71,
        1626.74,
        1633.75,
        1646.68,
        1648.6,
        1652.45,
        1663.52
    ];

    var closes = [
        1562.5,
        1578.78,
        1578.79,
        1585.16,
        1582.24,
        1593.61,
        1597.57,
        1582.7,
        1597.59,
        1614.42,
        1617.5,
        1625.96,
        1632.69,
        1626.67,
        1633.7,
        1633.77,
        1650.34,
        1658.78,
        1650.47,
        1667.47,
        1666.29
    ];

    it("test series", function () {
        var stochSeries = stoch(closes, highs, lows, 14, 3);

        assert.equal(90.39391845196968, stochSeries.k[0]);
        assert.equal(98.19335264101511, stochSeries.k[1]);
        assert.equal(96.2956810631229, stochSeries.k[2]);
        assert.equal(98.96654881697037, stochSeries.k[3]);
        assert.equal(96.77111878946737, stochSeries.k[4]);
        assert.equal(86.26106470514901, stochSeries.k[5]);
        assert.equal(100, stochSeries.k[6]);
        assert.equal(92.84622105723027, stochSeries.k[7]);

        assert.equal(null, stochSeries.d[0]);
        assert.equal(null, stochSeries.d[1]);
        assert.equal(94.9609840520359, stochSeries.d[2]);
        assert.equal(97.81852750703614, stochSeries.d[3]);
        assert.equal(97.34444955652022, stochSeries.d[4]);
        assert.equal(93.99957743719558, stochSeries.d[5]);
        assert.equal(94.34406116487213, stochSeries.d[6]);
        assert.equal(93.03576192079309, stochSeries.d[7]);
    });
});
