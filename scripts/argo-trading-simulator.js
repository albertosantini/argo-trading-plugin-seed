"use strict";

var util = require("util"),
    flic = require("flic"),
    config = require("../lib/util/config");

var nodeName = "master";

flic.createBridge();

process.on("uncaughtException", function (err) {
    util.log(err);
});

var masterNode = flic.createNode({
    id: nodeName,
    connect_callback: function (err) {
        if (!err) {
            util.log("Argo streaming simulator node online");
        } else {
            util.log(err);
        }
    }
});

masterNode.on("argo.register", function (pluginName, done) {
    util.log("Argo plugin registered", pluginName);
    done(null, "http://fake");

    setTimeout(function () {
        masterNode.tell(pluginName + ":argo.enable", config, pluginName);
    }, 100);
});

masterNode.on("argo.unregister", function (pluginName, done) {
    util.log("Argo plugin unregistered", pluginName);
    done();
});

masterNode.on("error", function (err) {
    util.log(err);
});

setInterval(fake, 5000);

function fake() {
    var data1 = {
            tick: {
                instrument: "EUR_USD",
                bid: getRandom(1, 1.5),
                ask: getRandom(1.5, 2),
                time: new Date()
            }
        }, data2 = {
            tick: {
                instrument: "USD_JPY",
                bid: getRandom(124, 125),
                ask: getRandom(126, 127),
                time: new Date()
            }
        }, data = flipCoin() ? data1 : data2;

    masterNode.shout("argo.streaming", data);
}

function flipCoin() {
    return Math.random() > 0.5;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
