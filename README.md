# ARGO-TRADING PLUGIN SEED

[![NPM version](https://badge.fury.io/js/argo-trading-plugin-seed.png)](http://badge.fury.io/js/argo-trading-plugin-seed)
[![NGN Dependencies](https://david-dm.org/albertosantini/argo-trading-plugin-seed.png)](https://david-dm.org/albertosantini/argo-trading-plugin-seed)
[![Build Status](https://travis-ci.org/albertosantini/argo-trading-plugin-seed.png)](https://travis-ci.org/albertosantini/argo-trading-plugin-seed)

This project is a plugin skeleton for [Argo](https://github.com/albertosantini/argo),
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

We get the tools we depend upon via `npm`, the [node package manager][https://www.npmjs.com/].

```
npm install
```

`node_modules` contains the npm packages for the tools we need.

### Run the plugin

The simplest way to start this demo plugin is:

```
npm start
```

## How to customize the plugin

In `lib/custom` folder there are the files implementing the name and the
callbacks of the plugin:

- `name.js` The registration name of the plugin.
- `onhearbeat.js` Called on `argo.streaming` with plugin status `loaded`.
- `onload.js` Called in the callback of `argo.register`
- `ontick.js` Called on `argo.streaming` with plugin status `enabled`.
- `ontransaction.js` Called on `argo.streaming` with plugin status `enabled`.
- `onunload.js` Called in the callback of `SIGINT`.

You need to fill the corresponding functions in those files.

## Communication with Argo

The communication with Argo is provided with [flic](https://github.com/nkcmr/flic),
an inter-process communication via TCP library.

### Events

- `argo.register` Told by plugin to register the plugin.
- `argo.unregister` Told by plugin to unregister the plugin.
- `argo.status` Told by Argo to get the plugin status.
- `argo.enable` Told by Argo to enable the plugin.
- `argo.disable` Told by Argo to disable the plugin.
- `argo.streaming` Told by Argo to pass streaming data (heartbeats, ticks and transactions).
- `error` To catch errors by plugin.
- `SIGINT` To stop the plugin with CTRL-C (or a SIGINT signal).
- `uncaughtException` To catch uncaught exceptions.


[OANDA]: http://fxtrade.oanda.co.uk/
[API]: http://developer.oanda.com/
[git]: http://git-scm.com/
