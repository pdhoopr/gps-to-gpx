export function doesExist(value) {
  return value !== undefined && value !== null;
}

export function getType(value) {
  if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  }

  return typeof value;
}
