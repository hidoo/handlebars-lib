# @hidoo/handlebars-helpers

[![Build Status](https://travis-ci.org/hidoo/handlebars-helpers.svg?branch=master)](https://travis-ci.org/hidoo/handlebars-helpers) [![Greenkeeper badge](https://badges.greenkeeper.io/hidoo/handlebars-helpers.svg)](https://greenkeeper.io/)

A helper library that summarizes commonly used functions in Handlebars.

## Installation

```sh
$ npm install handlebars @hidoo/handlebars-helpers
```

## Usage

```js
import Handlebars from 'handlebars';
import * as helpers from '@hidoo/handlebars-helpers';

Object.entries(helpers).forEach(([name, helper]) =>
  Handlebars.registerHelper(name, helper);
);
```

## Test

```sh
$ npm test
```

## License

MIT
