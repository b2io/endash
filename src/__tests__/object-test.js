import { hasAll, renameKeys } from '../index';

describe('object', () => {
  describe('hasAll', () => {
    test('should check one path', () => {
      const obj = { a: 1, b: 2, c: 3 };

      expect(hasAll(['a'], obj)).toBe(true);
      expect(hasAll(['z'], obj)).toBe(false);
    });

    test('should check many paths', () => {
      const obj = { a: 1, b: 2, c: 3 };

      expect(hasAll(['a', 'b', 'c'], obj)).toBe(true);
      expect(hasAll(['a', 'b', 'z'], obj)).toBe(false);
    });

    test('should be curried', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const hasAllABC = hasAll(['a', 'b', 'c']);

      expect(hasAllABC(obj)).toBe(true);
    });
  });

  describe('renameKeys', () => {
    test('should rename one key', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const expected = { aa: 1, b: 2, c: 3 };

      expect(renameKeys([['a', 'aa']], obj)).toEqual(expected);
    });

    test('should rename multiple keys', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const expected = { aa: 1, bb: 2, c: 3 };

      expect(renameKeys([['a', 'aa'], ['b', 'bb']], obj)).toEqual(expected);
    });

    test('should be curried', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const renameKeysA = renameKeys([['a', 'aa']]);
      const expected = { aa: 1, b: 2, c: 3 };

      expect(renameKeysA(obj)).toEqual(expected);
    });

    test('should not modify the object', () => {
      const obj = { a: 1, b: 2, c: 3 };

      renameKeys([['a', 'aa']], obj);

      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });
  });
});
