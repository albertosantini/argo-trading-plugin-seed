"use strict";

var util = require("util");

module.exports = onload;

function onload(name) {
    util.log("Plugin loaded", name);
}
