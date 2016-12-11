"use strict";

var util = require("util"),
    flic = require("flic"),
    config = require("./util/config"),
    pluginName = require("./custom/name"),
    onheartbeat = require("./custom/onheartbeat"),
    onload = require("./custom/onload"),
    ontick = require("./custom/ontick"),
    onbar = require("./custom/onbar"),
    ontransaction = require("./custom/ontransaction"),
    onunload = require("./custom/onunload"),
    bars = require("./bars");

var masterNodeName = "master",
    status;

var pluginNode = flic.createNode({
    id: pluginName,
    connect_callback: function (error) {
        var event = masterNodeName + ":argo.register";

        if (!error) {
            pluginNode.tell(event, pluginName, function (err, setup) {
                if (!err) {
                    status = "loaded";
                    config.apiUrl = setup;
                    onload(pluginName);
                    util.log("Argo plugin online", pluginName);
                } else {
                    util.log("Argo plugin not registered", err);
                }
            });
        } else {
            util.log(error);
        }
    }
});

pluginNode.on("argo.status", function (name, callback) {
    util.log("Argo plugin status", name, status);
    callback(null, status);
});

pluginNode.on("argo.enable", function (name, cfg, callback) {
    status = "enabled";
    util.log("Argo plugin enabled", pluginName);
    config.pips = cfg.pips || config.pips;
    callback();
});

pluginNode.on("argo.disable", function (name, callback) {
    status = "loaded";
    util.log("Argo plugin disabled", pluginName);
    callback();
});

pluginNode.on("argo.streaming", function (data) {
    var json,
        isLoaded = status === "loaded",
        isEnabled = status === "enabled",
        tick,
        completeBars;

    try {
        json = typeof data === "string" ? JSON.parse(data) : data;

        if ((isLoaded || isEnabled) && json.type === "HEARTBEAT") {
            onheartbeat(json);
        }
        if (isEnabled && json.type === "PRICE") {
            tick = {
                time: json.time,
                instrument: json.instrument,
                bid: json.bids[0].price || json.closeoutBid,
                ask: json.asks[0].price || json.closeoutAsk
            };

            ontick(tick);
            completeBars = bars.getCompleteBars(tick);
            completeBars.forEach(function (bar) {
                onbar(bar);
            });
        }
        if (isEnabled && json.accountID) {
            ontransaction(json);
        }
    /*eslint-disable no-empty */
    } catch (e) {
        // Discard "incomplete" json
    }
    /*eslint-enable no-empty */
});

pluginNode.on("error", function (err) {
    util.log(err);
});

process.on("uncaughtException", function (err) {
    handlingException(err);
});

process.on("SIGINT", function () {
    handlingException("Got SIGINT");
    onunload(pluginName);
    /*eslint-disable no-process-exit */
    process.exit(0);
    /*eslint-enable no-process-exit */
});

function handlingException(err) {
    var event = masterNodeName + ":argo.unregister";

    pluginNode.tell(event, pluginName, function () {
        status = "loaded";
    });
    util.log(err);
}
