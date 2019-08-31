"use strict";

const util = require("util"),
    request = require("request"),
    config = require("./config");

exports.getOrderbook = getOrderbook;

function getOrderbook(opts, callback) {
    const url = `${config.apiUrl}/api/orderbook`,
        instrument = opts && opts.instrument || "EUR_USD",
        period = opts && opts.period || "3600";

    request({
        method: "POST",
        url,
        json: true,
        body: {
            isPlugin: true,
            instrument,
            period
        }
    }, (err, res, orderbook) => {
        if (!err && !orderbook.code) {
            return callback(null, orderbook);
        }

        util.log("ERROR getOrderbook", instrument, orderbook.message);

        return callback(err || orderbook.code, orderbook);
    });

}
