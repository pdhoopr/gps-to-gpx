import xmlBuilder from 'xmlbuilder';

function doesArgExist(argValue) {
  return argValue !== undefined && argValue !== null;
}

function isArgCorrectType(argValue, type) {
  const argTypeMatch = Object.prototype.toString.call(argValue).match(/\[object (.+)\]/i);
  const argType = argTypeMatch.length ? argTypeMatch[1] : 'undefined';

  return argType === type;
}

function assertArgsAreValid(activity, time, data) {
  const invalidArgs = [];

  if (!doesArgExist(activity) || !isArgCorrectType(activity, 'String')) {
    invalidArgs.push('activity');
  }

  if (!doesArgExist(time) || !isArgCorrectType(time, 'String')) {
    invalidArgs.push('time');
  }

  if (!doesArgExist(data) || !isArgCorrectType(data, 'Array') || !data.length) {
    invalidArgs.push('data');
  }

  if (invalidArgs.length) {
    throw new Error(
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: ${invalidArgs.join(', ')}. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  }

  return;
}

export default function createGpxFromGps(activity, time, data) {
  assertArgsAreValid(activity, time, data);

  return;
}
