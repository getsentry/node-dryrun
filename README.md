# Dryrun

[![Downloads][npm-downloads]][npm-url]
[![version][npm-version]][npm-url]
[![License][npm-license]][license-url]
[![Build Status][travis-status]][travis-url]

Checks if the `DRY_RUN` environment variable is set to a truthy value. It considers any value truthy
other than: `unset`, `""`, `"0"`, `"false"` and `"no"`.

## Usage

Simply install with npm or yarn:

```sh
npm install dryrun
yarn add dryrun
```

To use it, import the `isDryRun` or `shouldPerform` functions:

```js
const { isDryRun, shouldPerform } = require('dryrun');
console.log(isDryRun());       // true if DRY_RUN was set
console.log(shouldPerform());  // opposite of isDryRun()
```

## Testing

`dryrun` comes with two handy functions for testing:

```js
const { resetDryRun, setDryRun } = require('dryrun');

setDryRun(true);  // explicitly activate DRY_RUN
...
resetDryRun();    // reset DRY_RUN to the environment value
```

[license-url]: https://github.com/getsentry/node-dryrun/blob/master/LICENSE

[npm-url]: https://www.npmjs.com/package/dryrun
[npm-license]: https://img.shields.io/npm/l/dryrun.svg?style=flat
[npm-version]: https://img.shields.io/npm/v/dryrun.svg?style=flat
[npm-downloads]: https://img.shields.io/npm/dm/dryrun.svg?style=flat

[travis-url]: https://travis-ci.org/getsentry/node-dryrun
[travis-status]: https://travis-ci.org/getsentry/node-dryrun.svg?branch=master
