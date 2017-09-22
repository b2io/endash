import { guardUndefined, tapUnless } from '../index';

const addOne = n => n + 1;
const multiply = (x, y) => x * y;

describe('function', () => {
  describe('guardUndefined', () => {
    test('should call with non-undefined args', () => {
      expect(guardUndefined(addOne, [2])).toEqual(3);
    });

    test('should not call with undefined args', () => {
      expect(guardUndefined(addOne, [undefined])).toEqual(undefined);
    });

    test('should not call with mixed args', () => {
      expect(guardUndefined(multiply, [2, undefined])).toEqual(undefined);
    });

    test('should be curried', () => {
      expect(guardUndefined(multiply)([2, 3])).toEqual(6);
    });
  });

  describe('tapUnless', () => {
    test('should invoke for a passing predicate', () => {
      expect(tapUnless(true, addOne, 1)).toEqual(2);
      expect(tapUnless(() => true, addOne, 1)).toEqual(2);
    });

    test('should not invoke for a falsy predicate', () => {
      expect(tapUnless(false, addOne, 1)).toEqual(1);
      expect(tapUnless(() => false, addOne, 1)).toEqual(1);
    });

    test('should be curried', () => {
      expect(tapUnless(true)(addOne)(1)).toEqual(2);
      expect(tapUnless(true, addOne)(1)).toEqual(2);
      expect(tapUnless(true)(addOne, 1)).toEqual(2);
    });
  });
});
