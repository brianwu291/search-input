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
    Req.upload.addEventListener("loadstart", handleLoadStartListener);
    Req.upload.addEventListener("loadstart", handleReqStart);
    Req.upload.addEventListener("load", handleSuccessListener);
    Req.upload.addEventListener("load", handleGetResponse);
    Req.upload.addEventListener("error", handleFailListener);
    Req.upload.addEventListener("error", handleFailResponse);
    Req.upload.addEventListener("abort", handleCancelListener);
    Req.open(method, route);
    Req.send();
    return Req;
  } else {
    throw new Error('this is for browser input element use.')
  }  
}

module.exports = handleRequest;
