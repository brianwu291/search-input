const { getIsBrowser } = require('./judgeEnvironment.js');

function createInputElement() {
  if (!getIsBrowser()) throw new Error('this is for browser input element use.');
  const inputEle = document.createElement('input');
  return inputEle;
}

module.exports = { createInputElement };