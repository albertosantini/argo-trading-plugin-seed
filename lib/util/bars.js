"use strict";

var util = require("util"),
    request = require("request"),
    config = require("./config");

exports.getHistBars = getHistBars;

function getHistBars(bar, callback) {
    var url = config.apiUrl + "/api/candles",
        instrument = bar && bar.instrument || "EUR_USD",
        granularity = bar && bar.granularity || "M5",
        count = bar && bar.count || 100,
        dailyAlignment = bar && bar.dailyAlignment || "0";

    request({
        "method": "POST",
        "url": url,
        "json": true,
        "body": {
            isPlugin: true,
            instrument: instrument,
            granularity: granularity,
            count: count,
            dailyAlignment: dailyAlignment
        }
    }, function (err, res, bars) {
        if (!err && !bars.code) {
            return callback(null, bars.reverse());
        } else {
            util.log("ERROR getHistBars", instrument, bars.message);
            return callback(err || bars.code, bars);
        }
    });

}
