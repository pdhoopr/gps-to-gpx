// Vendor imports
import { expect } from 'chai';

// Library imports
import { doesExist, getType } from '../src/utils';

describe('utils', () => {
  describe('doesExist', () => {
    it('should return `false` if `value` is `undefined`', () => {
      expect(doesExist()).to.be.false;
    });

    it('should return `false` if `value` is `null`', () => {
      expect(doesExist(null)).to.be.false;
    });

    it('should return `true` if `value` is some other falsy value, like 0', () => {
      expect(doesExist(0)).to.be.true;
    });

    it('should return `true` if `value` is not `null` or `undefined`', () => {
      expect(doesExist('value')).to.be.true;
    });
  });

  describe('getType', () => {
    it('should return "array" not "object" (the `typeof` result), when `value` is an array', () => {
      expect(getType([])).to.equal('array');
    });

    it('should return "null" not "object" (the `typeof` result), when `value` is `null` ', () => {
      expect(getType(null)).to.equal('null');
    });

    it('should return the `typeof` result for all other values, like a symbol', () => {
      expect(getType(Symbol())).to.equal('symbol');
    });
  });
});
