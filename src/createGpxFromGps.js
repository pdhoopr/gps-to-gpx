// Vendor (3rd-party) imports
import xmlBuilder from 'xmlbuilder';

// Module imports
import { doesArgExist, isArgCorrectType } from './utils/validateArgs.js';

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
      `correct type, but the following were invalid: ${invalidArgs.join(', ')}. ` +
      `Did you pass arguments that satisfy the order and types ` +
      `(activity: String, time: String, data: Array) when you called the function?`
    );
  }

  return;
}

export default function createGpxFromGps(activity, time, data) {
  assertArgsAreValid(activity, time, data);

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

  const track = gpx.ele('trk');
  track.ele('name', activity);

  return gpx.end({
    allowEmpty: true,
    indent: '  ',
    newline: '\n',
    pretty: true,
  });
}
