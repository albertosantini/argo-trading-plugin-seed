"use strict";

const util = require("util"),
    flic = require("flic"),
    config = require("../lib/util/config");

const nodeName = "master";

flic.createBridge();

process.on("uncaughtException", err => {
    util.log(err);
});

const masterNode = flic.createNode({
    id: nodeName,
    connect_callback: err => { // eslint-disable-line
        if (!err) {
            util.log("Argo streaming simulator node online");
        } else {
            util.log(err);
        }
    }
});

masterNode.on("argo.register", (pluginName, done) => {
    util.log("Argo plugin registered", pluginName);
    done(null, "http://fake");

    setTimeout(() => {
        masterNode.tell(`${pluginName}:argo.enable`, config, pluginName);
    }, 100);
});

masterNode.on("argo.unregister", (pluginName, done) => {
    util.log("Argo plugin unregistered", pluginName);
    done();
});

masterNode.on("error", err => {
    util.log(err);
});

setInterval(fake, 5000);

function fake() {
    const data1 = {
            tick: {
                instrument: "EUR_USD",
                bid: getRandom(1, 1.5),
                ask: getRandom(1.5, 2),
                time: new Date()
            }
        },
        data2 = {
            tick: {
                instrument: "USD_JPY",
                bid: getRandom(124, 125),
                ask: getRandom(126, 127),
                time: new Date()
            }
        },
        data = flipCoin() ? data1 : data2;

    masterNode.shout("argo.streaming", data);
}

function flipCoin() {
    return Math.random() > 0.5;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
