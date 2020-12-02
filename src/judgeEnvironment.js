function getIsBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}


module.exports = { 
  getIsBrowser
}