"use strict";

var util = require("util"),
    PluginNode = require("flic").node,
    config = require("./util/config"),
    pluginName = require("./custom/name"),
    onheartbeat = require("./custom/onheartbeat"),
    onload = require("./custom/onload"),
    ontick = require("./custom/ontick"),
    ontransaction = require("./custom/ontransaction"),
    onunload = require("./custom/onunload");

var masterNodeName = "master",
    status;

var pluginNode = new PluginNode(pluginName, function (error) {
    var event = masterNodeName + ":argo.register";

    if (!error) {
        pluginNode.tell(event, pluginName, function (err, setup) {
            if (!err) {
                status = "loaded";
                config.masterNodeUrl = setup;
                onload(pluginName);
                util.log("Argo plugin online", pluginName);
            } else {
                util.log("Argo plugin not registered", err);
            }
        });
    } else {
        util.log(error);
    }
});

pluginNode.on("argo.status", function (name, callback) {
    util.log("Argo plugin status", name, status);
    callback(null, status);
});

pluginNode.on("argo.enable", function (name, callback) {
    status = "enabled";
    util.log("Argo plugin enabled", pluginName);
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
