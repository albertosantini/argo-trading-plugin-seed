"use strict";

var util = require("util"),
    PluginNode = require("flic").node,
    pluginName = require("./custom/name"),
    onheartbeat = require("./custom/onheartbeat"),
    onload = require("./custom/onload"),
    ontick = require("./custom/ontick"),
    ontransaction = require("./custom/ontransaction");

var masterNodeName = "master",
    status;

var pluginNode = new PluginNode(pluginName, function (err) {
    var event = masterNodeName + ":argo.register";

    if (!err) {
        pluginNode.tell(event, pluginName, function () {
            status = "loaded";
            onload(pluginName);
            util.log("Argo plugin online", pluginName);
        });
    } else {
        util.log(err);
    }
});

pluginNode.on("argo.enable", function () {
    status = "enabled";
    util.log("Argo plugin enabled", pluginName);
});

pluginNode.on("argo.disable", function () {
    status = "loaded";
    util.log("Argo plugin disabled", pluginName);
});

pluginNode.on("argo.streaming", function (data) {
    var json,
        isLoaded = status === "loaded",
        isEnabled = status === "enabled";

    try {
        json = JSON.parse(data);

        if (isLoaded && json.heartbeat) {
            onheartbeat(json.heartbeat);
        }
        if (isEnabled && json.tick) {
            ontick(json.tick);
        }
        if (isEnabled && json.transaction) {
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


