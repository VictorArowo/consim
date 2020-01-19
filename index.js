const batch = require("./utils/batch");
/**
 * Callback to be executed for each element in the array
 *
 * @callback cb
 * @param {*} element
 */
/**
 * Executes promises in the input array in series i.e the next promise begins only after the preceding promisie is resolved or rejected
 * @param {Array} array
 * @param {cb} callback
 */
async function series(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Array expected!");
  const response = [];
  await array.reduce(async (acc, element) => {
    await acc;
    const res = await callback(element);
    response.push(res);
    return response;
  }, Promise.resolve());

  return response;
}

/**
 * Executes promises in the input array in parallel i.e all promises are executed at the same time
 * @param {Array} array
 * @param {cb} callback
 */
function parallel(array, callback) {
  if (!Array.isArray(array)) throw new TypeError("Array expected!");
  return Promise.all(array.map(item => callback(item)));
}

/**
 * Executes promises in the input array in parallel, and then in series
 * @param {Array} array
 * @param {cb} callback
 */
async function batchedSeries(array, callback, elementsPerBatch) {
  if (!Array.isArray(array)) throw new TypeError("Array expected!");
  const response = [];
  const batchArray = batch(array, elementsPerBatch);

  return series(batchArray, async bch => {
    const res = await parallel(bch, callback);
    response.push(res);
    return response;
  });
}

module.exports = {
  series,
  parallel,
  batchedSeries
};
