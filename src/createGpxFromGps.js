// Vendor (3rd-party) imports
import xmlBuilder from 'xmlbuilder';

// Module imports
import { doesExist, isCorrectType } from './utils';

export default function createGpxFromGps(waypoints) {
  if (!doesExist(waypoints) || !isCorrectType(waypoints, 'array') || !waypoints.length) {
    throw new Error(
      'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array, ' +
      'but something was wrong with the provided data. Did you pass an array of waypoints ' +
      '(not undefined, null or empty) as the first argument when you called the function?'
    );
  }

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

  return gpx.end({
    allowEmpty: true,
    indent: '  ',
    newline: '\n',
    pretty: true,
  });
}
