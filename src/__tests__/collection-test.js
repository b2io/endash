import { flatMapNested } from '../collection';

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
});
