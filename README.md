# Consim

![NPM](https://img.shields.io/npm/l/consim?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/min/consim?style=for-the-badge)

## Introduction

Consim is a small module for NodeJS, that contains utility functions which gives you more control over how asynchronous callback functions are invoked on an array.

## Installation

`npm install consim`

## Usage

### Series

Executes next promise only after the preceding promise is resolved or rejected.

```js
consim.series(arr, cb);
```

- `arr` is an array containing all the elements to be passed into `cb`.
- `cb` is a function that's executed for all elements in `arr`.

##### Example

```js
const consim = require("consim");
const axios = require("axios");

consim.series([1, 2, 3, 4, 5], async num => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${num}`
  );
  console.log(res.data);
});
```

### Parallel

Executes all promises at the same time. Doesn't work reliably when the input array gets large as node isn't able to handle it.

```js
consim.parallel(arr, cb);
```

- `arr` is an array containing all the elements to be passed into `cb`.
- `cb` is a function that's executed for all elements in `arr`.

##### Example

```js
const consim = require("consim");
const axios = require("axios");

consim.parallel([1, 2, 3, 4, 5], async num => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${num}`
  );
  console.log(res.data);
});
```

### BatchedSeries

Executes all promises at the same time. Doesn't work reliably when the input array gets large as node isn't able to handle it.

```js
consim.batchedSeries(arr, cb, elementsPerBatch);
```

- `arr` is an array containing all the elements to be passed into `cb`.
- `cb` is a function that's executed for all elements in `arr`.
- `elementsPerBatch` an integer which determines how many requests run at the same time.

##### Example

```js
const consim = require("consim");
const axios = require("axios");

consim.batchedSeries([1, 2, 3, 4, 5], async num => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${num}`
  );
  console.log(res.data);
});
```

## Tests

`npm test`
