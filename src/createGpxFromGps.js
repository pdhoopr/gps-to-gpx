// Vendor (3rd-party) imports
import xmlBuilder from 'xmlbuilder';

// Module imports
import { doesArgExist, isArgCorrectType } from './utils/validateArgs.js';

function assertArgsAreValid(time, waypoints, activityName) {
  const invalidArgs = [];

  if (!doesArgExist(time) || !isArgCorrectType(time, 'String')) {
    invalidArgs.push('time');
  }

  if (!doesArgExist(waypoints) || !isArgCorrectType(waypoints, 'Array') || !waypoints.length) {
    invalidArgs.push('waypoints');
  }

  if (!doesArgExist(activityName) || !isArgCorrectType(activityName, 'String')) {
    invalidArgs.push('activityName');
  }

  if (invalidArgs.length) {
    throw new Error(
      `createGpxFromGps expected the parameters (time, waypoints, activityName) to exist and ` +
      `be of the correct type, but the following were invalid: ${invalidArgs.join(', ')}. ` +
      `Did you pass arguments that satisfy the order and types ` +
      `(time: String, waypoints: Array, activityName: String) when you called the function?`
    );
  }

  return;
}

export default function createGpxFromGps(time, waypoints, activityName = 'Other') {
  assertArgsAreValid(time, waypoints, activityName);

  const gpx = xmlBuilder
    .create('gpx', {
      encoding: 'UTF-8',
    })
    .att('creator', 'Patrick Hooper')
    .att('version', '1.1')
    .att('xmlns', 'http://www.topografix.com/GPX/1/1')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xsi:schemaLocation',
      'http://www.topografix.com/GPX/1/1 ' +
      'http://www.topografix.com/GPX/1/1/gpx.xsd ' +
      'http://www.garmin.com/xmlschemas/GpxExtensions/v3 ' +
      'http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd ' +
      'http://www.garmin.com/xmlschemas/TrackPointExtension/v1 ' +
      'http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd'
    );

  const metadata = gpx.ele('metadata');
  metadata.ele('name', 'Activity');
  metadata.ele('time', time);

  const trk = gpx.ele('trk');
  trk.ele('name', activityName);

  return gpx.end({
    allowEmpty: true,
    indent: '  ',
    newline: '\n',
    pretty: true,
  });
}
