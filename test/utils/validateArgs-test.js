import { expect } from 'chai';
import { doesArgExist, isArgCorrectType } from '../../src/utils/validateArgs';

describe('validateArgs', () => {
  describe('doesArgExist', () => {
    it('should return false if "argValue" is not provided (i.e. undefined)', () => {
      expect(doesArgExist()).to.be.false;
    });

    it('should return false if "argValue" is null', () => {
      expect(doesArgExist(null)).to.be.false;
    });

    it('should return true if "argValue" is some other falsy value, like 0', () => {
      expect(doesArgExist(0)).to.be.true;
    });

    it('should return true if "argValue" is not null or undefined', () => {
      expect(doesArgExist('argValue')).to.be.true;
    });
  });

  describe('isArgCorrectType', () => {
    it('should return false when "argValue" is a String and "type" is a Number', () => {
      expect(isArgCorrectType('argValue', 'Number')).to.be.false;
    });

    it('should return true for an Array', () => {
      expect(isArgCorrectType([], 'Array'));
    });

    it('should return true for a Boolean', () => {
      expect(isArgCorrectType(true, 'Boolean'));
    });

    it('should return true for a Number', () => {
      expect(isArgCorrectType(1, 'Number'));
    });

    it('should return true for an Object literal', () => {
      expect(isArgCorrectType({}, 'Object'));
    });

    it('should return true for a String', () => {
      expect(isArgCorrectType('string', 'String'));
    });
  });
});
