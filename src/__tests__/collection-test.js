import { flatMapNested, hasMembers, insertAt, partitionAt } from '../index';

describe('collection', () => {
  describe('flatMapNested', () => {
    test('should flatMap one step', () => {
      const collection = [{ a: [0] }, { a: [1, 2] }, { a: [3] }];

      expect(flatMapNested(['a'], collection)).toEqual([0, 1, 2, 3]);
    });

    test('should flatMap multiple steps', () => {
      const collection = [
        { a: [{ b: [{ c: [0] }] }] },
        { a: [{ b: [{ c: [1] }, { c: [2] }] }] },
        { a: [{ b: [{ c: [3] }] }] },
      ];

      expect(flatMapNested(['a', 'b', 'c'], collection)).toEqual([0, 1, 2, 3]);
    });

    test('should be curried', () => {
      const collection = [{ a: [0] }, { a: [1, 2] }, { a: [3] }];
      const flatMapA = flatMapNested(['a']);

      expect(flatMapA(collection)).toEqual([0, 1, 2, 3]);
    });
  });

  describe('hasMembers', () => {
    test('should be true for a collection with members', () => {
      expect(hasMembers([0, 1])).toEqual(true);
    });

    test('should be false for an empty collection', () => {
      expect(hasMembers([])).toEqual(false);
    });

    test('should be nil-safe', () => {
      expect(() => hasMembers()).not.toThrow();
      expect(hasMembers()).toEqual(false);
    });
  });

  describe('insertAt', () => {
    test('should insert at the beginning', () => {
      const collection = ['a', 'b', 'c'];

      expect(insertAt(0, 'z', collection)).toEqual(['z', 'a', 'b', 'c']);
    });

    test('should insert in the middle', () => {
      const collection = ['a', 'b', 'c'];

      expect(insertAt(1, 'z', collection)).toEqual(['a', 'z', 'b', 'c']);
    });

    test('should insert at the end', () => {
      const collection = ['a', 'b', 'c'];

      expect(insertAt(3, 'z', collection)).toEqual(['a', 'b', 'c', 'z']);
    });

    test('should insert given out-of-bounds indicies', () => {
      const collection = ['a', 'b', 'c'];

      expect(insertAt(-1, 'z', collection)).toEqual(['z', 'a', 'b', 'c']);
      expect(insertAt(5, 'z', collection)).toEqual(['a', 'b', 'c', 'z']);
    });

    test('should be curried', () => {
      const collection = ['a', 'b', 'c'];
      const expected = ['z', 'a', 'b', 'c'];

      expect(insertAt(0)('z')(collection)).toEqual(expected);
      expect(insertAt(0, 'z')(collection)).toEqual(expected);
      expect(insertAt(0)('z', collection)).toEqual(expected);
    });
  });

  describe('partitionAt', () => {
    test('should partition at the given index', () => {
      const collection = ['a', 'b', 'c'];

      expect(partitionAt(2, collection)).toEqual([['a', 'b'], ['c']]);
    });

    test('should partition given out-of-bounds indicies', () => {
      const collection = ['a', 'b', 'c'];

      expect(partitionAt(-1, collection)).toEqual([[], collection]);
      expect(partitionAt(4, collection)).toEqual([collection, []]);
    });

    test('should partition an empty collection', () => {
      expect(partitionAt(2, [])).toEqual([[], []]);
    });

    test('should be curried', () => {
      expect(partitionAt(2)([])).toEqual([[], []]);
    });
  });
});
