export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const get = (object, attributeChain, defaultValue = null) => {
  if (!object || typeof object !== 'object') {
    return defaultValue;
  }

  const attributes = attributeChain
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.')
    .filter((item) => item);
  let isValid = true;
  let returnVal = object;

  for (let i = 0; i < attributes.length; i++) {
    if (!returnVal || Object.keys(returnVal).indexOf(attributes[i]) < 0) {
      isValid = false;
      break;
    }
    returnVal = returnVal[attributes[i]];
  }
  return isValid ? returnVal : defaultValue;
};
