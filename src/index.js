import xmlBuilder from 'xmlbuilder';
import { doesExist, getType } from './utils';

function assertArgValidity(waypoints, options) {
  if (
    !doesExist(waypoints) ||
    getType(waypoints) !== 'array' ||
    !waypoints.length ||
    waypoints.some(point => getType(point) !== 'object')
  ) {
    throw new Error(
      'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array ' +
      'of GPS points, but something was wrong with the provided data. Did you pass an array ' +
      '(not undefined, null or empty) of waypoints (each point being an object) as the first ' +
      'argument when you called the function?'
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

/**
 * Creates a GPX (a form of XML) string from provided GPS waypoints. Additional options can be
 * provided that override default settings and customize some other pieces of the output. Provided
 * arguments need to pass the necessary sanity checks. For "waypoints", this means it cannot be
 * undefined or null, must be an array, and cannot be empty. For "options", this means it must be
 * an object literal.
 *
 * @param {Array} waypoints - GPS waypoint data.
 * @param {Object} options - Additional options that customize/override the module settings.
 *
 * @returns {String} A GPX (a form of XML) string composed of the given waypoints and options.
 */
export default function createGpxFromGps(waypoints, options = {}) {
  assertArgValidity(waypoints, options);

  const defaultSettings = {
    activityName: "Everyday I'm hustlin'",
    eleKey: 'elevation',
    latKey: 'latitude',
    lonKey: 'longitude',
    timeKey: 'time',
    startTime: null,
  };
  const settings = Object.assign(defaultSettings, options);

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
  if (settings.activityName) {
    trk.ele('name', settings.activityName);
  }

  const trkseg = trk.ele('trkseg');

  waypoints.forEach((point) => {
    if (!point.hasOwnProperty(settings.latKey) || !point.hasOwnProperty(settings.lonKey)) {
      throw new Error(
        'createGpxFromGps expected to find properties for latitude and longitude on all GPS ' +
        'points, but at least one point did not have both. Did you pass an array of waypoints ' +
        '(where every point has a latitude and longitude) as the first argument when you called ' +
        'the function? These properties are pretty essential to a well-formed GPX file. If they ' +
        'are found using property names different than in the default settings, you can ' +
        'override the "latKey" and "lonKey" options in the second argument to the function call.'
      );
    }

    const trkpt = trkseg
      .ele('trkpt')
      .att('lat', point[settings.latKey])
      .att('lon', point[settings.lonKey]);
    if (point.hasOwnProperty(settings.eleKey)) {
      trkpt.ele('ele', point[settings.eleKey]);
    }
    if (point.hasOwnProperty(settings.timeKey)) {
      trkpt.ele('time', point[settings.timeKey]);
    }
  });

  return gpx.end({
    allowEmpty: true,
    indent: '  ',
    newline: '\n',
    pretty: true,
  });
}
