"use strict";

const util = require("util"),
    request = require("request"),
    config = require("./config");

exports.getHistBars = getHistBars;

function getHistBars(bar, callback) {
    const url = `${config.apiUrl}/api/candles`,
        instrument = bar && bar.instrument || "EUR_USD",
        granularity = bar && bar.granularity || "M5",
        count = bar && bar.count || 100,
        dailyAlignment = bar && bar.dailyAlignment || "0";

    request({
        method: "POST",
        url,
        json: true,
        body: {
            isPlugin: true,
            instrument,
            granularity,
            count,
            dailyAlignment
        }
    }, (err, res, bars) => {
        if (!err && !bars.code) {
            return callback(null, bars.reverse());
        }

        util.log("ERROR getHistBars", instrument, bars.message);

        return callback(err || bars.code, bars);
    });

}
