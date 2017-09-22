import { curry, isFunction } from 'lodash/fp';
import { isDefined } from './lang';

const guardUndefined = curry(
  (f, args) => (args.every(isDefined) ? f(...args) : undefined),
);

const tapUnless = curry((predicate, f, value) => {
  const passed = isFunction(predicate) ? predicate(value) : predicate;

  return passed ? f(value) : value;
});

export { guardUndefined, tapUnless };
