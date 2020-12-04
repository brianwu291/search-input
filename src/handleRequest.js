const { getIsBrowser } = require('./judgeEnvironment.js');

function handleRequest(method = 'GET', route, handleCallbacks) {
  if (getIsBrowser()) {
    const {
      handleLoadStartListener = () => {},
      handleSuccessListener = () => {},
      handleFailListener = () => {},
      handleCancelListener = () => {},
      // these three functions is for state change use.
      handleReqStart = () => {}, 
      handleGetResponse = () => {},
      handleFailResponse = () => {},
    } = handleCallbacks
    const Req = new XMLHttpRequest();
    Req.addEventListener("loadstart", handleLoadStartListener);
    Req.addEventListener("loadstart", handleReqStart);
    Req.addEventListener("load", handleSuccessListener);
    Req.addEventListener("load", handleGetResponse);
    Req.addEventListener("error", handleFailListener);
    Req.addEventListener("error", handleFailResponse);
    Req.addEventListener("abort", handleCancelListener);
    Req.open(method, route);
    Req.send();
    return Req;
  } else {
    throw new Error('this is for browser input element use.')
  }  
}

module.exports = handleRequest;
