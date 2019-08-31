"use strict";

const assert = require("assert");

const ema = require("../lib/indicators/ema");

describe("ema", () => {
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
        428.35
    ];

    it("test series", () => {
        const emaSeries = ema(series, 12);

        assert.strictEqual(440.8975000000001, emaSeries[0]);
        assert.strictEqual(439.31019230769243, emaSeries[1]);
        assert.strictEqual(438.1424704142013, emaSeries[2]);
        assert.strictEqual(438.10055188893955, emaSeries[3]);
        assert.strictEqual(436.61277467525656, emaSeries[4]);
        assert.strictEqual(435.341578571371, emaSeries[5]);
    });

    it("test next", () => {
        const emaNext = ema(428.43, 12, 438.10055188893955);

        assert.strictEqual(436.61277467525656, emaNext);
    });
});
