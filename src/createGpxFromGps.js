// Vendor (3rd-party) imports
import xmlBuilder from 'xmlbuilder';

// Module imports
import { doesExist, getType } from './utils';

function assertArgValidity(waypoints, options) {
  if (!doesExist(waypoints) || getType(waypoints) !== 'array' || !waypoints.length) {
    throw new Error(
      'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array, ' +
      'but something was wrong with the provided data. Did you pass an array of waypoints ' +
      '(not undefined, null or empty) as the first argument when you called the function?'
    );
  }

  if (getType(options) !== 'object') {
    throw new Error(
      `createGpxFromGps expected the parameter "options" to be an object, but instead it was ` +
      `the type "${getType(options)}". Did you pass an object literal of additional options ` +
      `as the second argument when you called the function? "options" is not a required ` +
      `parameter, so unless you need to override some default settings, you can leave it blank.`
    );
  }

  return;
}

export default function createGpxFromGps(waypoints, options = {}) {
  assertArgValidity(waypoints, options);

  let settings = {
    activityName: 'Other',
    coordinateKeys: {
      ele: 'elevation',
      lat: 'latitude',
      lon: 'longitude',
      time: 'time',
    },
    startTime: null,
  };
  settings = Object.assign(settings, options);

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
  if (settings.startTime) {
    metadata.ele('time', settings.startTime);
  }

  const trk = gpx.ele('trk');
  trk.ele('name', settings.activityName);

  return gpx.end({
    allowEmpty: true,
    indent: '  ',
    newline: '\n',
    pretty: true,
  });
}
