import { expect } from 'chai';
import { createGpxFromGps } from '../src';

describe('createGpxFromGps', () => {
  it('should throw an error if no parameters are provided (i.e. undefined)', () => {
    expect(() => {
      createGpxFromGps();
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: activity, time, data. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if provided parameters are null', () => {
    expect(() => {
      createGpxFromGps(null, null, null);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: activity, time, data. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "activity" parameter is not provided', () => {
    expect(() => {
      createGpxFromGps(null, 'startTime', [{}]);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: activity. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "time" parameter is not provided', () => {
    expect(() => {
      createGpxFromGps('activity', null, [{}]);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: time. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "data" parameter is not provided', () => {
    expect(() => {
      createGpxFromGps('activity', 'time', null);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: data. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "activity" parameter is of a type other than "string"', () => {
    expect(() => {
      createGpxFromGps(1, 'time', [{}]);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: activity. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "time" parameter is of a type other than "string"', () => {
    expect(() => {
      createGpxFromGps('activity', true, [{}]);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: time. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "data" parameter is of a type other than "array"', () => {
    expect(() => {
      createGpxFromGps('activity', 'time', {});
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: data. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });

  it('should throw an error if "data" parameter is empty (has no length)', () => {
    expect(() => {
      createGpxFromGps('activity', 'time', []);
    }).to.throw(Error,
      `createGpxFromGps expected the parameters (activity, time, data) to exist and be of the ` +
      `correct type, but the following were invalid: data. Did you pass ` +
      `arguments that satisfy the order and types (activity: String, time: String, data: Array) ` +
      `when you called the function?`
    );
  });
});
