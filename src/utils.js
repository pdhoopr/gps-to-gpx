/**
 * Performs a quick existence check for a value. A value is determined to exist if it is not
 * `undefined` and not `null`.
 *
 * @param value - The value to check the existence of.
 *
 * @returns {Boolean} `true` if value exists (not `undefined` and not `null`), `false` otherwise.
 */
export function doesExist(value) {
  return value !== undefined && value !== null;
}

/**
 * Performs a quick type check for a value. This is basically just the `typeof` operator, except it
 * returns "null" (instead of "object") for `null` value and "array" (instead of "object") for an
 * array.
 *
 * @param value - The value to check the type of.
 *
 * @returns {String} The type of the value as a string.
 */
export function getType(value) {
  if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  }

  /* istanbul ignore next */
  return typeof value;
}
