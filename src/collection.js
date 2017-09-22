import { curry, flatMap, take, takeRight } from 'lodash/fp';

const flatMapNested = curry((iterators, collection) =>
  iterators.reduce((result, iteratee) => flatMap(iteratee, result), collection),
);

const hasMembers = collection => !!(collection && collection.length);

const insertAt = curry((index, value, collection) => [
  ...take(index, collection),
  value,
  ...takeRight(collection.length - index, collection),
]);

const partitionAt = curry((index, collection) => {
  if (index <= -1) return [[], collection];
  if (index >= collection.length) return [collection, []];

  return collection.reduce(
    ([before, after], value, localIndex) =>
      localIndex >= index
        ? [before, after.concat(value)]
        : [before.concat(value), after],
    [[], []],
  );
});

export { flatMapNested, hasMembers, insertAt, partitionAt };
