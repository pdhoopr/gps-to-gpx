import { expect } from 'chai';
import { doesExist, getType } from '../src/utils';

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

  describe('getType', () => {
    it('should return array when "value" is an array', () => {
      expect(getType([])).to.equal('array');
    });

    it('should return boolean when "value" is a boolean', () => {
      expect(getType(true)).to.equal('boolean');
    });

    it('should return function when "value" is a function', () => {
      expect(getType(() => 'function')).to.equal('function');
    });

    it('should return null when "value" is null', () => {
      expect(getType(null)).to.equal('null');
    });

    it('should return number when "value" is a number', () => {
      expect(getType(1)).to.equal('number');
    });

    it('should return object when "value" is an object literal', () => {
      expect(getType({})).to.equal('object');
    });

    it('should return string when "value" is a string', () => {
      expect(getType('string')).to.equal('string');
    });

    it('should return symbol when "value" is a symbol', () => {
      expect(getType(Symbol())).to.equal('symbol');
    });

    it('should return undefined when "value" is undefined', () => {
      expect(getType()).to.equal('undefined');
    });
  });
});
