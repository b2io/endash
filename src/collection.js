import { curry, flatMap } from 'lodash/fp';

const flatMapNested = curry((iterators, collection) =>
  iterators.reduce((result, iteratee) => flatMap(iteratee, result), collection),
);

// eslint-disable-next-line import/prefer-default-export
export { flatMapNested };
