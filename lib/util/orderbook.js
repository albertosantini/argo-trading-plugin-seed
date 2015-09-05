"use strict";

var util = require("util"),
    request = require("request"),
    config = require("./config");

exports.getOrderbook = getOrderbook;

function getOrderbook(opts, callback) {
    var url = config.apiUrl + "/api/orderbook",
        instrument = opts && opts.instrument || "EUR_USD",
        period = opts && opts.period || "3600";

    request({
        "method": "POST",
        "url": url,
        "json": true,
        "body": {
            isPlugin: true,
            instrument: instrument,
            period: period
        }
    }, function (err, res, orderbook) {
        if (!err && !orderbook.code) {
            return callback(null, orderbook);
        } else {
            util.log("ERROR getOrderbook", instrument, orderbook.message);
            return callback(err || orderbook.code, orderbook);
        }
    });

}
