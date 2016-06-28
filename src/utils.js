export function doesExist(value) {
  return value !== undefined && value !== null;
}

export function isCorrectType(value, expectedType) {
  const actualTypeMatch = Object.prototype.toString.call(value).match(/\[object (.+)\]/i);
  const actualType = actualTypeMatch.length ? actualTypeMatch[1].toLowerCase() : 'undefined';

  return actualType === expectedType.toLowerCase();
}
