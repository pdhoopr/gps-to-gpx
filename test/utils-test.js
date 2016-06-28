import { expect } from 'chai';
import { doesExist, isCorrectType } from '../src/utils';

describe('utils', () => {
  describe('doesExist', () => {
    it('should return false if "value" is undefined', () => {
      expect(doesExist()).to.be.false;
    });

    it('should return false if "value" is null', () => {
      expect(doesExist(null)).to.be.false;
    });

    it('should return true if "value" is some other falsy value, like 0', () => {
      expect(doesExist(0)).to.be.true;
    });

    it('should return true if "value" is not null or undefined', () => {
      expect(doesExist('value')).to.be.true;
    });
  });

  describe('isCorrectType', () => {
    it('should return false when "value" type (string) is not "expectedType" (number)', () => {
      expect(isCorrectType('value', 'number')).to.be.false;
    });

    it('should return true when "expectedType" is not all lowercase', () => {
      expect(isCorrectType([], 'ArRaY')).to.be.true;
    });

    it('should return true for an array', () => {
      expect(isCorrectType([], 'array')).to.be.true;
    });

    it('should return true for a boolean', () => {
      expect(isCorrectType(true, 'boolean')).to.be.true;
    });

    it('should return true for a number', () => {
      expect(isCorrectType(1, 'number')).to.be.true;
    });

    it('should return true for an object literal', () => {
      expect(isCorrectType({}, 'object')).to.be.true;
    });

    it('should return true for a string', () => {
      expect(isCorrectType('string', 'string')).to.be.true;
    });
  });
});
