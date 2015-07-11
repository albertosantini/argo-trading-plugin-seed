# ARGO-TRADING PLUGIN SEED

[![NPM version](https://badge.fury.io/js/argo-trading-plugin-seed.png)](http://badge.fury.io/js/argo-trading-plugin-seed)
[![NGN Dependencies](https://david-dm.org/albertosantini/argo-trading-plugin-seed.png)](https://david-dm.org/albertosantini/argo-trading-plugin-seed)
[![Build Status](https://travis-ci.org/albertosantini/argo-trading-plugin-seed.png)](https://travis-ci.org/albertosantini/argo-trading-plugin-seed)

This project is a plugin skeleton for [Argo][],
the open source trading platform, connecting directly with [OANDA][] through the
powerful [API][].

You can use it to quickly bootstrap your plugin, especially for your trading
strategies.

The seed plugin doesn't do much, just shows how to wire the plugin with Argo.

## Getting Started

To get you started you can simply clone the argo-trading-plugin-seed repository
and install the dependencies:

### Prerequisites

You need git to clone the argo-trading-plugin-seed repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of Node.js tools to initialize and test argo-trading-plugin-seed.
You must have Node.js or io.js and its package manager (npm) installed.
You can get them from [http://nodejs.org/](http://nodejs.org/) or
[https://iojs.org/](https://iojs.org/).

### Clone argo-trading-plugin-seed

Clone the argo-trading-plugin-seed repository using [git][]:

```
git clone https://github.com/albertosantini/argo-trading-plugin-seed.git
cd argo-trading-plugin-seed
```

If you only want to have a copy of the repository, without the history, then just delete the .git folder after cloning and then re-initialize the repository:

```bash
git clone --depth=1 https://github.com/albertosantini/argo-trading-plugin-seed.git <your-project-name>
cd <your-project-name>
rm -rf .git
git init
git remote add origin https://github.com/myname/<your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com/).

```
npm install
```

`node_modules` contains the npm packages for the tools we need.

### Run the plugin

After starting [Argo][], the simplest way to start the seed plugin is:

```
npm start
```

## How to customize the plugin

In `lib/custom` folder there are the files implementing the name and the
callbacks of the plugin:

- `name.js` The registration name of the plugin.

```
module.exports = "seed";
```

- `onhearbeat.js` Called on `argo.streaming` with plugin status `loaded` or `enabled`.

```
function onheartbeat(beat) // beat.time
```

- `onload.js` Called on `argo.register` callback.

```
function onload(name) // plugin name
```

- `ontick.js` Called on `argo.streaming` with plugin status `enabled` for every tick.

```
function ontick(tick)
    // tick.time
    // tick.instrument
    // tick.bid
    // tick.ask
```

- `onbar.js` Called on `argo.streaming` with plugin status `enabled` for every completed bar.

```
function onbar(bar)
    // bar.time
    // bar.instrument
    // bar.granularity
    // bar.openMid
    // bar.highMid
    // bar.lowMid
    // bar.closeMid
    // bar.volume
```

- `ontransaction.js` Called on `argo.streaming` with plugin status `enabled`.

```
function ontransaction(transaction)
    // transaction.id
    // transaction.accountId
    // transaction.time
    // transaction.type
    // transaction.instrument
    // transaction.side
    // transaction.units
    // transaction.price
    // transaction.lowerBound
    // transaction.upperBound
    // transaction.takeProfitPrice
    // transaction.stopLossPrice
    // transaction.trailingStopLossDistance
    // transaction.pl
    // transaction.interest
    // transaction.accountBalance
    // transaction.tradeId
    // transaction.orderId
    // transaction.tradeOpened
    // transaction.tradeReduced
```

- `onunload.js` Called on `SIGINT` callback.

```
function onunload(name) // plugin name
```

You need to fill the corresponding functions in those files.

### Utils

Inside the callbacks, you may fill orders or request the historical bars.

#### order.fillOrder(order, callback)

```
var orderUtil = require("../util/order");

orderUtil.fillOrder({
    instrument: "EUR_USD",
    type: "market",
    side: "buy",
    units: 100
}, console.log);

```

See [OANDA order endpoints](http://developer.oanda.com/rest-live/orders/) for
more details about input and output parameters.

#### bars.getHistBars(barOptions, callback)

```
var barsUtil = require("../util/bars");

barsUtil.getHistBars({
    instrument: "EUR_USD",
    granularity: "M5"
}, console.log);
```

Notice `bars[0]` is the most recent bar, usually not completed.

See [OANDA rate endpoints](http://developer.oanda.com/rest-live/rates/) for more
details about input and output parameters.

#### Indicators

- `ema`: `function ema(closes, period, ema0)`
- `macd`: `macd(closes, slowPeriod, fastPeriod, signalPeriod, slowPeriod0, fastPeriod0, signalPeriod0)`
- `rsi`: `function rsi(closes, period, close0, avgGain, avgLoss)`

### Scripts

- `scripts/argo-trading-simulator.js` Primitive simulator to simulate rates streaming.

## Communication with Argo

The communication with Argo is provided with [flic](https://github.com/nkcmr/flic),
an inter-process communication via TCP library.

### Events

The events are handled in `lib/main.js` and, usually, the plugin developer
should not modify it.

- `argo.register` Told by plugin to register the plugin.
- `argo.unregister` Told by plugin to unregister the plugin.
- `argo.status` Told by Argo to get the plugin status.
- `argo.enable` Told by Argo to enable the plugin.
- `argo.disable` Told by Argo to disable the plugin.
- `argo.streaming` Told by Argo to pass streaming data (heartbeats, ticks and transactions).
- `error` To catch errors by plugin.
- `SIGINT` To stop the plugin with CTRL-C (or a SIGINT signal).
- `uncaughtException` To catch uncaught exceptions.

## Checklist, if you want to publish your plugin

- Rename the project, using the convention `argo-trading-plugin-<myplugin>`.
- Rename the start script as `bin/argo-trading-plugin-<myplugin>`.
- Rename the content of `bin` property in `package.json`.
- Check `Gruntfile.js`.


[Argo]: https://github.com/albertosantini/argo
[OANDA]: http://fxtrade.oanda.co.uk/
[API]: http://developer.oanda.com/
[git]: http://git-scm.com/
