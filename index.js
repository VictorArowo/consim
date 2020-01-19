const batch = require("./utils/batch");

async function series(promiseArr, callback) {
  if (!Array.isArray(promiseArr)) throw new TypeError("Array expected!");
  const response = [];
  await promiseArr.reduce(async (acc, element) => {
    await acc;
    const res = await callback(element);
    response.push(res);
    return response;
  }, Promise.resolve());

  return response;
}

function parallel(promiseArr, callback) {
  return Promise.all(promiseArr.map(item => callback(item)));
}

async function batchedSeries(promiseArr, callback, elementsPerBatch) {
  if (!Array.isArray(promiseArr)) throw new TypeError("Array expected!");
  const response = [];
  const batchArray = batch(promiseArr, elementsPerBatch);

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
