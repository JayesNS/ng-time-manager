'use strict';

/**
 * @description Makes sure that body contains all parameters
 * @returns object if contains all requested params
 */
function fetchParams(object, expectedParams) {
  const keys = Object.keys(object);
  const areParamsPresent = expectedParams.every(
    param => keys.includes(param) && object[param] !== null && object[param] !== undefined
  );

  if (!areParamsPresent) {
    logErrorToConsole(
      'Request body does not contain required params. Expected',
      object,
      'to contain',
      expectedParams
    );
    return null;
  }
  return object;
}

function handleError(error, res, status) {
  logErrorToConsole(error);
  res.status(status).send(error);
}

const developmentMode = true;
function logErrorToConsole(...message) {
  if (!developmentMode) {
    return;
  }
  console.error('\nError!', ...message, '\n');
}

module.exports = { fetchParams, logErrorToConsole, handleError };
