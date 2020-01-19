function batch(array, elementPerBatch) {
  const result = [];

  for (let i = 0; i < array.length; i += elementPerBatch) {
    result.push(array.slice(i, i + elementPerBatch));
  }

  return result;
}

module.exports = batch;
