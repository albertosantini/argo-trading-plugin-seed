"use strict";

const util = require("util");

module.exports = onunload;

function onunload(name) {
    util.log("Plugin unloaded", name);
}
