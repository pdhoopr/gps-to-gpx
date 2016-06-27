import { expect } from 'chai';
import { createGpxFromGps } from '../src';

describe('createGpxFromGps', () => {
  describe('assertArgsAreValid', () => {
    it('should throw an error about any required parameters that are undefined', () => {
      expect(() => createGpxFromGps()).to.throw(Error,
        `createGpxFromGps expected the parameters (time, waypoints, activityName) to exist and ` +
        `be of the correct type, but the following were invalid: time, waypoints. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(time: String, waypoints: Array, activityName: String) when you called the function?`
      );
    });

    it('should throw an error about any parameters that are null', () => {
      expect(() => createGpxFromGps(null, null, null)).to.throw(Error,
        `createGpxFromGps expected the parameters (time, waypoints, activityName) to exist and ` +
        `be of the correct type, but the following were invalid: time, waypoints, activityName. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(time: String, waypoints: Array, activityName: String) when you called the function?`
      );
    });

    it('should throw an error about any parameters that are the wrong type', () => {
      expect(() => createGpxFromGps(true, {}, 2)).to.throw(Error,
        `createGpxFromGps expected the parameters (time, waypoints, activityName) to exist and ` +
        `be of the correct type, but the following were invalid: time, waypoints, activityName. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(time: String, waypoints: Array, activityName: String) when you called the function?`
      );
    });

    it('should throw an error if "waypoints" is empty', () => {
      expect(() => createGpxFromGps('time', [], 'activityName')).to.throw(Error,
        `createGpxFromGps expected the parameters (time, waypoints, activityName) to exist and ` +
        `be of the correct type, but the following were invalid: waypoints. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(time: String, waypoints: Array, activityName: String) when you called the function?`
      );
    });

    it('should not throw an error if all parameters are defined and the correct type', () => {
      expect(() => createGpxFromGps('time', [{}], 'activityName')).to.not.throw(Error);
    });

    it('should not throw an error if optional/default parameters are not explicity defined', () => {
      expect(() => createGpxFromGps('time', [{}])).to.not.throw(Error);
    });
  });

  it('should render an xml element', () => {
    expect(createGpxFromGps('time', [{}])).to.match(/^<\?xml.*\?>/);
  });

  it('should render a gpx element', () => {
    expect(createGpxFromGps('time', [{}])).to.match(/<gpx.*>[\s\S]*<\/gpx>/);
  });

  it('should render a metadata element with name "Activity" and time as the provided time', () => {
    expect(createGpxFromGps('2015-07-20T23:30:49Z', [{}])).to.match(
      /<metadata>\s*<name>Activity<\/name>\s*<time>2015-07-20T23:30:49Z<\/time>\s*<\/metadata>/
    );
  });

  it('should render a trk element with name as the default activityName', () => {
    expect(createGpxFromGps('2015-07-20T23:30:49Z', [{}])).to.match(
      /<trk>\s*<name>Other<\/name>[\s\S]*<\/trk>/
    );
  });

  it('should render a trk element with name as the provided activityName', () => {
    expect(createGpxFromGps('2015-07-20T23:30:49Z', [{}], 'RUN')).to.match(
      /<trk>\s*<name>RUN<\/name>[\s\S]*<\/trk>/
    );
  });
});
