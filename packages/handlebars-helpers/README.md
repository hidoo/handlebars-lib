# @hidoo/handlebars-helpers

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

via register API:

```js
import Handlebars from 'handlebars';
import register from '@hidoo/handlebars-helpers/register';

register(Handlebars);
```

## Test

```sh
$ yarn test
```

## License

MIT
