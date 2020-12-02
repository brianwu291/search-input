const handleRequest = require('./handleRequest');
const { createInputElement } = require('./createElement');
const { getIsBrowser } = require('./judgeEnvironment');

function generateSearchStuff(method = 'GET', route, handleCallbacks = {}) {
  if (!getIsBrowser() || !route) throw new Error('this works on browser only. And route should be provided.');
  let response = null, error = null, isSearching = false, RequestRef = null;
  function handleReqStart() {
    isSearching = true;
  }
  function handleGetResponse () {
    response = this.response;
    error = null;
    isSearching = false;
  }
  function handleFailResponse () {
    error = this.response;
    response = null;
    isSearching = false;
  }
  const callbacks = {
    ...handleCallbacks,
    handleReqStart,
    handleGetResponse,
    handleFailResponse,
  }
  function handleInputChange(e) {
    const userInput = e.target.value;
    if (userInput.trim() === '') {
      isSearching = false;
      return
    }
    if (userInput.trim()) {
      if (RequestRef) {
        RequestRef.abort();
      }
      const req = handleRequest(method, route, callbacks);
      RequestRef = req;
    }
  }
  const inputEle = createInputElement();
  inputEle.addEventListener('input', handleInputChange);
  return ({
    inputEle,
    response,
    error,
    isSearching,
    RequestRef,
  })
}

module.exports = generateSearchStuff;
