"use strict";

var util = require("util"),
    request = require("request"),
    config = require("./config");

exports.fillOrder = fillOrder;

function fillOrder(order, callback) {
    var url = config.apiUrl + "/api/order";

    request({
        "method": "POST",
        "url": url,
        "json": true,
        "body": {
            isPlugin: true,
            instrument: order.instrument,
            units: order.units,
            side: order.side,
            type: order.type,
            expiry: order.expiry,
            price: order.price,
            priceBound: order.lowerBound || order.upperBound,
            stopLossOnFill: order.stopLossOnFill,
            takeProfitOnFill: order.takeProfitOnFill,
            trailingStopLossOnFill: order.trailingStopLossOnFill
        }
    }, function (err, res, trade) {
        if (!err && !trade.errorMessage && !trade.code) {
            return callback(null, trade);
        } else {
            util.log("ERROR fillOrder", err || trade.errorMessage || trade.code);
            return callback(err || trade.errorMessage || trade.code);
        }
    });

}
