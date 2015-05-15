"use strict";

var util = require("util"),
    StreamingNode = require("flic").node;

var onheartbeat = require("./custom/onheartbeat"),
    ontick = require("./custom/ontick"),
    ontransaction = require("./custom/ontransaction");

var streamingNode = new StreamingNode(function (err) {
    if (!err) {
        util.log("Argo plugin online");
    } else {
        util.log(err);
    }
});

streamingNode.on("argo.streaming", function (data) {
    var json;

    try {
        json = JSON.parse(data);

        if (json.heartbeat) {
            onheartbeat(json.heartbeat);
        }
        if (json.tick) {
            ontick(json.tick);
        }
        if (json.transaction) {
            ontransaction(json.transaction);
        }
    /*eslint-disable no-empty */
    } catch (e) {
        // Discard "incomplete" json
    }
    /*eslint-enable no-empty */
});

streamingNode.on("error", function (err) {
    util.log(err);
});
