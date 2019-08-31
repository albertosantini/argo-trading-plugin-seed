"use strict";

const util = require("util"),
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

const masterNodeName = "master";

let status;

const pluginNode = flic.createNode({
    id: pluginName,
    "connect_callback": error => { // eslint-disable-line
        const event = `${masterNodeName}:argo.register`;

        if (!error) {
            pluginNode.tell(event, pluginName, (err, setup) => {
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

pluginNode.on("argo.status", (name, callback) => {
    util.log("Argo plugin status", name, status);
    callback(null, status);
});

pluginNode.on("argo.enable", (name, cfg, callback) => {
    status = "enabled";
    util.log("Argo plugin enabled", pluginName);
    config.pips = cfg.pips || config.pips;
    callback();
});

pluginNode.on("argo.disable", (name, callback) => {
    status = "loaded";
    util.log("Argo plugin disabled", pluginName);
    callback();
});

pluginNode.on("argo.streaming", data => {
    const isLoaded = status === "loaded",
        isEnabled = status === "enabled";

    let json, tick, completeBars;

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
            completeBars.forEach(bar => {
                onbar(bar);
            });
        }
        if (isEnabled && json.accountID) {
            ontransaction(json);
        }
    } catch (e) {

        // Discard "incomplete" json
    }
});

pluginNode.on("error", err => {
    util.log(err);
});

process.on("uncaughtException", err => {
    handlingException(err);
});

process.on("SIGINT", () => {
    handlingException("Got SIGINT");
    onunload(pluginName);
    process.exit(0); // eslint-disable-line
});

function handlingException(err) {
    const event = `${masterNodeName}:argo.unregister`;

    pluginNode.tell(event, pluginName, () => {
        status = "loaded";
    });
    util.log(err);
}
