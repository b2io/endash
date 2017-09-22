import { condv } from '../index';

describe('util', () => {
  describe('condv', () => {
    test('should match given non-function predicates', () => {
      const match = condv([[0, 'A'], [1, 'B']]);

      expect(match(1)).toEqual('B');
    });

    test('should match given function predicates', () => {
      const match = condv([[v => v === 0, 'A'], [v => v === 1, 'B']]);

      expect(match(1)).toEqual('B');
    });

    test('should match when the predicate is the value', () => {
      const value = () => false;
      const match = condv([[value, 'A']]);

      expect(match(value)).toEqual('A');
    });

    test('should match given mixed predicates', () => {
      const match = condv([[v => v === 0, 'A'], [1, 'B']]);

      expect(match(1)).toEqual('B');
    });

    test('should match given mixed values', () => {
      const match = condv([[v => v === 0, 'A'], [1, () => 'B']]);

      expect(match(1)).toEqual('B');
    });

    test('should return undefined when unmatched', () => {
      const match = condv([]);

      expect(match(0)).toEqual(undefined);
    });

    test('should invoke a function result', () => {
      const match = condv([[0, () => 'B']]);

      expect(match(0)).toEqual('B');
    });
  });
});

condv([[0, 'A'], [1, 'B'], [2, 'C']])(1);
