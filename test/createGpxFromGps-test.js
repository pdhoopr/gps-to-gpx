import { expect } from 'chai';
import { createGpxFromGps } from '../src';

describe('createGpxFromGps', () => {
  describe('assertArgsAreValid', () => {
    it('should throw an error if no parameters are provided (i.e. undefined)', () => {
      expect(() => createGpxFromGps()).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: activity, time, data. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if provided parameters are null', () => {
      expect(() => createGpxFromGps(null, null, null)).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: activity, time, data. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "activity" is not provided', () => {
      expect(() => createGpxFromGps(null, 'startTime', [{}])).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: activity. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "time" is not provided', () => {
      expect(() => createGpxFromGps('activity', null, [{}])).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: time. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "data" is not provided', () => {
      expect(() => createGpxFromGps('activity', 'time', null)).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: data. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "activity" is not a String', () => {
      expect(() => createGpxFromGps(1, 'time', [{}])).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: activity. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "time" is not a String', () => {
      expect(() => createGpxFromGps('activity', true, [{}])).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: time. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "data" is not an Array', () => {
      expect(() => createGpxFromGps('activity', 'time', {})).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: data. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });

    it('should throw an error if "data" is empty (has no length)', () => {
      expect(() => createGpxFromGps('activity', 'time', [])).to.throw(Error,
        `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
        `correct type, but the following were invalid: data. ` +
        `Did you pass arguments that satisfy the order and types ` +
        `(activity: String, time: String, data: Array) when you called the function?`
      );
    });
  });

  it('should render an xml element when valid', () => {
    expect(createGpxFromGps('activity', 'time', [{}])).to.match(/^<\?xml.*\?>/);
  });

  it('should render a gpx element when valid', () => {
    expect(createGpxFromGps('activity', 'time', [{}])).to.match(/<gpx.*>[\s\S]*<\/gpx>/);
  });

  it('should render a metadata element with name "Activity" and time as the provided time', () => {
    expect(createGpxFromGps('activity', '2015-07-20T23:30:49Z', [{}])).to.match(
      /<metadata>\s*<name>Activity<\/name>\s*<time>2015-07-20T23:30:49Z<\/time>\s*<\/metadata>/
    );
  });
});
