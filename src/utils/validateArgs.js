export function doesArgExist(argValue) {
  return argValue !== undefined && argValue !== null;
}

export function isArgCorrectType(argValue, type) {
  const argTypeMatch = Object.prototype.toString.call(argValue).match(/\[object (.+)\]/i);
  const argType = argTypeMatch.length ? argTypeMatch[1] : 'undefined';

  return argType === type;
}
