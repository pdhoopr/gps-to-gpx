import { expect } from 'chai';
import { createGpxFromGps } from '../src';

describe('createGpxFromGps', () => {
  describe('assertArgValidity', () => {
    it('should throw an error if "waypoints" is undefined', () => {
      expect(() => createGpxFromGps()).to.throw(Error,
        'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array, ' +
        'but something was wrong with the provided data. Did you pass an array of waypoints ' +
        '(not undefined, null or empty) as the first argument when you called the function?'
      );
    });

    it('should throw an error if "waypoints" is null', () => {
      expect(() => createGpxFromGps(null)).to.throw(Error,
        'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array, ' +
        'but something was wrong with the provided data. Did you pass an array of waypoints ' +
        '(not undefined, null or empty) as the first argument when you called the function?'
      );
    });

    it('should throw an error if "waypoints" is the wrong type', () => {
      expect(() => createGpxFromGps({})).to.throw(Error,
        'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array, ' +
        'but something was wrong with the provided data. Did you pass an array of waypoints ' +
        '(not undefined, null or empty) as the first argument when you called the function?'
      );
    });

    it('should throw an error if "waypoints" is empty', () => {
      expect(() => createGpxFromGps([])).to.throw(Error,
        'createGpxFromGps expected the parameter "waypoints" to exist and be a non-empty array, ' +
        'but something was wrong with the provided data. Did you pass an array of waypoints ' +
        '(not undefined, null or empty) as the first argument when you called the function?'
      );
    });

    it('should not throw an error if "waypoints" is defined and a non-empty array', () => {
      expect(() => createGpxFromGps([{}])).to.not.throw(Error);
    });

    it('should throw an error if "options" is null', () => {
      expect(() => createGpxFromGps([{}], null)).to.throw(Error,
        `createGpxFromGps expected the parameter "options" to be an object, but instead it was ` +
        `the type "null". Did you pass an object literal of additional options ` +
        `as the second argument when you called the function? "options" is not a required ` +
        `parameter, so unless you need to override some default settings, you can leave it blank.`
      );
    });

    it('should throw an error if "options" is the wrong type', () => {
      expect(() => createGpxFromGps([{}], 1)).to.throw(Error,
        `createGpxFromGps expected the parameter "options" to be an object, but instead it was ` +
        `the type "number". Did you pass an object literal of additional options ` +
        `as the second argument when you called the function? "options" is not a required ` +
        `parameter, so unless you need to override some default settings, you can leave it blank.`
      );
    });

    it('should not throw an error if "options" is undefined (there are default values)', () => {
      expect(() => createGpxFromGps([{}], undefined)).to.not.throw(Error);
    });

    it('should not throw an error if "options" is an object literal', () => {
      expect(() => createGpxFromGps([{}], {})).to.not.throw(Error);
    });
  });

  it('should render an xml element', () => {
    expect(createGpxFromGps([{}])).to.match(/^<\?xml.*\?>/);
  });

  it('should render a gpx element', () => {
    expect(createGpxFromGps([{}])).to.match(/<gpx.*>[\s\S]*<\/gpx>/);
  });

  // it('should render a metadata element with name "Activity" and time as the provided time', () => {
  //   expect(createGpxFromGps('2015-07-20T23:30:49Z', [{}])).to.match(
  //     /<metadata>\s*<name>Activity<\/name>\s*<time>2015-07-20T23:30:49Z<\/time>\s*<\/metadata>/
  //   );
  // });
  //
  // it('should render a trk element with name as the default activityName', () => {
  //   expect(createGpxFromGps('2015-07-20T23:30:49Z', [{}])).to.match(
  //     /<trk>\s*<name>Other<\/name>[\s\S]*<\/trk>/
  //   );
  // });
  //
  // it('should render a trk element with name as the provided activityName', () => {
  //   expect(createGpxFromGps('2015-07-20T23:30:49Z', [{}], 'RUN')).to.match(
  //     /<trk>\s*<name>RUN<\/name>[\s\S]*<\/trk>/
  //   );
  // });
});
