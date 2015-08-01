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
            lowerBound: order.lowerBound,
            upperBound: order.upperBound,
            stopLoss: order.stopLoss,
            takeProfit: order.takeProfit,
            trailingStop: order.trailingStop
        }
    }, function (err, res, trade) {
        if (!err && !trade.code) {
            util.log(trade.time, order.instrument,
                order.type, order.side, trade.price);
            return callback(null, trade);
        } else {
            util.log("ERROR fillOrder", order.instrument, trade.message);
            return callback(err || trade.code, trade);
        }
    });

}
