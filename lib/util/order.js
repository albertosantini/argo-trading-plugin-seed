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
        if (!err && !trade.code) {
            util.log(trade.data);
            return callback(null, trade.data);
        } else {
            util.log("ERROR fillOrder", err);
            return callback(err, trade.data);
        }
    });

}
