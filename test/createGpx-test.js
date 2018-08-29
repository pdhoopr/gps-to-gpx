// Vendor imports
import { expect } from 'chai';

// Library imports
import createGpx from '../src';
import { waypoints, waypointsWithCustomKeys, waypointsWithAllFields } from './fixtures';

describe('createGpx', () => {
  it('should throw an error if `waypoints` is `undefined`', () => {
    expect(() => createGpx()).to.throw(Error,
      'createGpx expected the parameter `waypoints` to exist and be a non-empty array ' +
      'of GPS points, but something was wrong with the provided data. Did you pass an array ' +
      '(not `undefined`, `null` or empty) of waypoints (each point being an object) as the ' +
      'first argument when you called the function?'
    );
  });

  it('should throw an error if `waypoints` is `null`', () => {
    expect(() => createGpx(null)).to.throw(Error,
      'createGpx expected the parameter `waypoints` to exist and be a non-empty array ' +
      'of GPS points, but something was wrong with the provided data. Did you pass an array ' +
      '(not `undefined`, `null` or empty) of waypoints (each point being an object) as the ' +
      'first argument when you called the function?'
    );
  });

  it('should throw an error if `waypoints` is the wrong type', () => {
    expect(() => createGpx({})).to.throw(Error,
      'createGpx expected the parameter `waypoints` to exist and be a non-empty array ' +
      'of GPS points, but something was wrong with the provided data. Did you pass an array ' +
      '(not `undefined`, `null` or empty) of waypoints (each point being an object) as the ' +
      'first argument when you called the function?'
    );
  });

  it('should throw an error if `waypoints` is empty', () => {
    expect(() => createGpx([])).to.throw(Error,
      'createGpx expected the parameter `waypoints` to exist and be a non-empty array ' +
      'of GPS points, but something was wrong with the provided data. Did you pass an array ' +
      '(not `undefined`, `null` or empty) of waypoints (each point being an object) as the ' +
      'first argument when you called the function?'
    );
  });

  it('should throw an error if every point in `waypoints` is not an object', () => {
    expect(() => createGpx([{}, 1, {}, true])).to.throw(Error,
      'createGpx expected the parameter `waypoints` to exist and be a non-empty array ' +
      'of GPS points, but something was wrong with the provided data. Did you pass an array ' +
      '(not `undefined`, `null` or empty) of waypoints (each point being an object) as the ' +
      'first argument when you called the function?'
    );
  });

  it('should not throw an error if `waypoints` exists as a non-empty array of objects', () => {
    expect(() => createGpx(waypoints)).to.not.throw(Error);
  });

  it('should throw an error if `options` is `null`', () => {
    expect(() => createGpx(waypoints, null)).to.throw(Error,
      `createGpx expected the parameter \`options\` to be an object, but instead it was ` +
      `the type "null". Did you pass an object literal of additional options ` +
      `as the second argument when you called the function? \`options\` is not a required ` +
      `parameter, so unless you need to override some default settings, you can leave it blank.`
    );
  });

  it('should throw an error if `options` is the wrong type', () => {
    expect(() => createGpx(waypoints, 1)).to.throw(Error,
      `createGpx expected the parameter \`options\` to be an object, but instead it was ` +
      `the type "number". Did you pass an object literal of additional options ` +
      `as the second argument when you called the function? \`options\` is not a required ` +
      `parameter, so unless you need to override some default settings, you can leave it blank.`
    );
  });

  it('should not throw an error if `options` is `undefined` (there are default values)', () => {
    expect(() => createGpx(waypoints, undefined)).to.not.throw(Error);
  });

  it('should not throw an error if `options` is an object literal', () => {
    expect(() => createGpx(waypoints, {})).to.not.throw(Error);
  });

  it('should add an `<xml>` element', () => {
    expect(createGpx(waypoints)).to.match(/^<\?xml.*\?>/);
  });

  it('should add a `<gpx>` element', () => {
    expect(createGpx(waypoints)).to.match(/<gpx.*>[\s\S]*<\/gpx>/);
  });

  it('should add a `<gpx>` element with the default `creator`', () => {
    expect(createGpx(waypoints)).to.match(/<gpx.*creator="Patrick Hooper".*>[\s\S]*<\/gpx>/);
  });

  it('should add a `<gpx>` element with the provided `creator`', () => {
    expect(createGpx(waypoints, {
      creator: 'Joe Cool',
    })).to.match(/<gpx.*creator="Joe Cool".*>[\s\S]*<\/gpx>/);
  });

  it('should add a `<metadata>` element with name as "Activity"', () => {
    expect(createGpx(waypoints)).to.match(
      /<metadata>[\s\S]*<name>Activity<\/name>[\s\S]*<\/metadata>/
    );
  });

  it('should add a `<metadata>` element but no `<time>` element if `startTime` is `null`', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<metadata>[\s\S]*<time>.*<\/time>[\s\S]*<\/metadata>/
    );
  });

  it('should add a `<metadata>` element with `<time>` if `startTime` is a `Date` object', () => {
    expect(createGpx(waypoints, {
      startTime: new Date('2015-07-20T23:30:49Z'),
    })).to.match(
      /<metadata>[\s\S]*<time>2015-07-20T23:30:49.000Z<\/time>[\s\S]*<\/metadata>/
    );
  });

  it('should add a `<metadata>` element with `<time>` if `startTime` is a string', () => {
    expect(createGpx(waypoints, {
      startTime: '2015-07-20T23:30:49Z',
    })).to.match(
      /<metadata>[\s\S]*<time>2015-07-20T23:30:49Z<\/time>[\s\S]*<\/metadata>/
    );
  });

  it('should add a `<trk>` element', () => {
    expect(createGpx(waypoints)).to.match(/<trk>[\s\S]*<\/trk>/);
  });

  it('should add a `<trk>` element with the `<name>` element as default `activityName`', () => {
    expect(createGpx(waypoints)).to.match(
      /<trk>[\s\S]*<name>Everyday I'm hustlin'<\/name>[\s\S]*<\/trk>/
    );
  });

  it('should add a `<trk>` element but no `<name>` element when `activityName` is `null`', () => {
    expect(createGpx(waypoints, {
      activityName: null,
    })).to.not.match(
      /<trk>[\s\S]*<name>.*<\/name>[\s\S]*<\/trk>/
    );
  });

  it('should add a `<trk>` element with `<name>` element as `activityName` if not `null`', () => {
    expect(createGpx(waypoints, {
      activityName: 'RUN',
    })).to.match(
      /<trk>[\s\S]*<name>RUN<\/name>[\s\S]*<\/trk>/
    );
  });

  it('should add a `<trkseg>` element', () => {
    expect(createGpx(waypoints)).to.match(/<trkseg>[\s\S]*<\/trkseg>/);
  });

  it('should throw an error if a waypoint lacks latitude or longitude', () => {
    expect(() => createGpx([{}])).to.throw(Error,
      'createGpx expected to find properties for latitude and longitude on all GPS ' +
      'points, but at least one point did not have both. Did you pass an array of waypoints ' +
      '(where every point has a latitude and longitude) as the first argument when you called ' +
      'the function? These properties are pretty essential to a well-formed GPX file. If they ' +
      'are found using property names different than in the default settings, you can ' +
      'override the `latKey` and `lonKey` options in the second argument to the function call.'
    );
  });

  it('should throw an error if default `latKey` and `lonKey` are not found', () => {
    expect(() => createGpx(waypointsWithCustomKeys)).to.throw(Error,
      'createGpx expected to find properties for latitude and longitude on all GPS ' +
      'points, but at least one point did not have both. Did you pass an array of waypoints ' +
      '(where every point has a latitude and longitude) as the first argument when you called ' +
      'the function? These properties are pretty essential to a well-formed GPX file. If they ' +
      'are found using property names different than in the default settings, you can ' +
      'override the `latKey` and `lonKey` options in the second argument to the function call.'
    );
  });

  it('should throw an error if custom `latKey` and `lonKey` are not found', () => {
    expect(() => createGpx(waypoints, {
      latKey: 'lat',
      lonKey: 'lon',
    })).to.throw(Error,
      'createGpx expected to find properties for latitude and longitude on all GPS ' +
      'points, but at least one point did not have both. Did you pass an array of waypoints ' +
      '(where every point has a latitude and longitude) as the first argument when you called ' +
      'the function? These properties are pretty essential to a well-formed GPX file. If they ' +
      'are found using property names different than in the default settings, you can ' +
      'override the `latKey` and `lonKey` options in the second argument to the function call.'
    );
  });

  it('should add as many `<trkpt>` elements as there are waypoints', () => {
    const gpx = createGpx(waypoints);
    let numMatchedWaypoints = 0;

    waypoints.forEach((point) => {
      const regex = new RegExp(
        `<trkpt lat="${point.latitude}" lon="${point.longitude}"/>`
      );
      const matches = gpx.match(regex);

      if (matches && matches.length) {
        numMatchedWaypoints += 1;
      }
    });

    expect(numMatchedWaypoints).to.equal(waypoints.length);
  });

  it('should add `<trkpt>` elements without `<course>` element if `courseKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<course>.*<\/course>[\s\S]*<\/trkpt>/
    );
  });

  it('should add `<trkpt>` elements without `<ele>` element if `eleKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<ele>.*<\/ele>[\s\S]*<\/trkpt>/
    );
  });

  it('should add `<trkpt>` elements without `<hdop>` element if `hdopKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<hdop>.*<\/hdop>[\s\S]*<\/trkpt>/
    );
  });

  it('should add `<trkpt>` elements without `<speed>` element if `speedKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<speed>.*<\/speed>[\s\S]*<\/trkpt>/
    );
  });

  it('should add `<trkpt>` elements without `<vdop>` element if `vdopKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<vdop>.*<\/vdop>[\s\S]*<\/trkpt>/
    );
  });

  it('should add `<trkpt>` elements without `<time>` element if `timeKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<time>.*<\/time>[\s\S]*<\/trkpt>/
    );
  });

  it('should add `<trkpt>` elements without `<extensions>` element if `extKey` is not found', () => {
    expect(createGpx(waypoints)).to.not.match(
      /<trkpt>[\s\S]*<extensions>.*<\/extensions>[\s\S]*<\/trkpt>/
    );
  });

  it('should add as many `<trkpt>` elements (with all fields) as there are waypoints', () => {
    const gpx = createGpx(waypointsWithAllFields);
    let numMatchedWaypoints = 0;

    waypointsWithAllFields.forEach((point) => {
      const { course, latitude, longitude, elevation, hdop, speed, time, vdop, extensions } = point;
      const { atemp, hr, cad } = extensions;
      const regex = new RegExp(
        `<trkpt lat="${latitude}" lon="${longitude}">\\s*` +
        `<course>${course}</course>\\s*` +
        `<ele>${elevation}</ele>\\s*` +
        `<hdop>${hdop}</hdop>\\s*` +
        `<speed>${speed}</speed>\\s*` +
        `<vdop>${vdop}</vdop>\\s*` +
        `<time>${time instanceof Date ? time.toISOString() : time}</time>\\s*` +
        `<extensions>\\s*` +
        `<gpxtpx:TrackPointExtension>\\s*` +
        `<gpxtpx:atemp>${atemp}</gpxtpx:atemp>\\s*` +
        `<gpxtpx:hr>${hr}</gpxtpx:hr>\\s*` +
        `<gpxtpx:cad>${cad}</gpxtpx:cad>\\s*` +
        `</gpxtpx:TrackPointExtension>\\s*` +
        `</extensions>\\s*` +
        `</trkpt>`
      );
      const matches = gpx.match(regex);

      if (matches && matches.length) {
        numMatchedWaypoints += 1;
      }
    });

    expect(numMatchedWaypoints).to.equal(waypointsWithAllFields.length);
  });
});
