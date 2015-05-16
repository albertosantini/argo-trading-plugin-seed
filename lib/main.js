"use strict";

var util = require("util"),
    PluginNode = require("flic").node,
    pluginName = require("./custom/name"),
    onheartbeat = require("./custom/onheartbeat"),
    ontick = require("./custom/ontick"),
    ontransaction = require("./custom/ontransaction");

var masterNodeName = "master",
    status;

var pluginNode = new PluginNode(pluginName, function (err) {
    var event = masterNodeName + ":argo.register";

    if (!err) {
        pluginNode.tell(event, pluginName, function () {
            status = "loaded";
            util.log("Argo plugin online", pluginName);
        });
    } else {
        util.log(err);
    }
});

pluginNode.on("argo.start", function () {
    status = "started";
    util.log("Argo plugin started", pluginName);
});

pluginNode.on("argo.stop", function () {
    status = "loaded";
    util.log("Argo plugin stopped", pluginName);
});

pluginNode.on("argo.streaming", function (data) {
    var json,
        isLoaded = status === "loaded",
        isStarted = status === "started";

    try {
        json = JSON.parse(data);

        if (isLoaded && json.heartbeat) {
            onheartbeat(json.heartbeat);
        }
        if (isStarted && json.tick) {
            ontick(json.tick);
        }
        if (isStarted && json.transaction) {
            ontransaction(json.transaction);
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
    var event = masterNodeName + ":argo.unregister";

    pluginNode.tell(event, pluginName, function () {
        status = "loaded";
    });
    util.log(err);
});


