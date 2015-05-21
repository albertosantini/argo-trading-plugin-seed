"use strict";

var util = require("util"),
    request = require("request");

// TODO: security concerns!
// A plugin should not be aware of the credentials
// Argo should not cache the credentials
// Solution?

var credentials = {};

exports.fillOrder = fillOrder;

function fillOrder(order) {
    request.post("/api/order", {
        environment: credentials.environment,
        token: credentials.token,
        accountId: credentials.accountId,
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
    }, function (err, res, body) {
        if (!err) {
            util.log(body);
        }
    });

}
