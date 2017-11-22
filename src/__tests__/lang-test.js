import { isDefined, isPresent } from '../index';

describe('lang', () => {
  describe('isDefined', () => {
    test('should be true for a truthy value', () => {
      expect(isDefined(true)).toEqual(true);
      expect(isDefined(1)).toEqual(true);
      expect(isDefined(-1)).toEqual(true);
      expect(isDefined('a')).toEqual(true);
      expect(isDefined("a")).toEqual(true); // prettier-ignore
    });

    test('should be true for a non-undefined falsy value', () => {
      expect(isDefined(null)).toEqual(true);
      expect(isDefined(false)).toEqual(true);
      expect(isDefined(0)).toEqual(true);
      expect(isDefined(-0)).toEqual(true);
      expect(isDefined(NaN)).toEqual(true);
      expect(isDefined('')).toEqual(true);
      expect(isDefined("")).toEqual(true); // prettier-ignore
    });

    test('should be false for undefined', () => {
      expect(isDefined(undefined)).toEqual(false);
    });
  });

  describe('isPresent', () => {
    test('should be false for a nil value', () => {
      expect(isPresent(null)).toEqual(false);
      expect(isPresent(undefined)).toEqual(false);
    });

    test('should be true for a non-nil falsy value', () => {
      expect(isPresent(false)).toEqual(true);
      expect(isPresent(0)).toEqual(true);
      expect(isPresent(-0)).toEqual(true);
      expect(isPresent(NaN)).toEqual(true);
      expect(isPresent('')).toEqual(true);
      expect(isPresent("")).toEqual(true); // prettier-ignore
    });

    test('should be true for a truthy value', () => {
      expect(isPresent(true)).toEqual(true);
      expect(isPresent(1)).toEqual(true);
      expect(isPresent(-1)).toEqual(true);
      expect(isPresent('a')).toEqual(true);
      expect(isPresent("a")).toEqual(true); // prettier-ignore
    });
  });
});
