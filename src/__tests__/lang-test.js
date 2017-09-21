import { isPresent } from '../lang';

describe('lang', () => {
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
      expect(isPresent("")).toEqual(true); // eslint-disable-line prettier/prettier
    });

    test('should be true for a truthy value', () => {
      expect(isPresent(true)).toEqual(true);
      expect(isPresent(1)).toEqual(true);
      expect(isPresent(-1)).toEqual(true);
      expect(isPresent('a')).toEqual(true);
      expect(isPresent("a")).toEqual(true); // eslint-disable-line prettier/prettier
    });
  });
});
