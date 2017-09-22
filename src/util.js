import { cond, isFunction } from 'lodash/fp';

const condv = pairs =>
  cond(
    pairs.map(([predicate, result]) => [
      isFunction(predicate)
        ? v => predicate(v) || v === predicate
        : v => v === predicate,
      isFunction(result) ? result : () => result,
    ]),
  );

// eslint-disable-next-line import/prefer-default-export
export { condv };
