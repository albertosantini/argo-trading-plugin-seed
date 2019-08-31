"use strict";

const util = require("util");

module.exports = ontransaction;

function ontransaction(transaction) {
    const t = transaction;

    if (t.type === "ORDER_FILL") {
        util.log(t.time, t.id, t.type, t.instrument, t.accountBalance, t.pl);
    }
}
