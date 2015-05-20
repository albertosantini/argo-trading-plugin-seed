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

We get the tools we depend upon via `npm`, the [node package manager][npm].

```
npm install
```

`node_modules` contains the npm packages for the tools we need

### Run the plugin

The simplest way to start this plugin is:

```
npm start
```

## How to customize the plugin

## Interface with Argo


[OANDA]: http://fxtrade.oanda.co.uk/
[API]: http://developer.oanda.com/
[git]: http://git-scm.com/
