import { curry, has } from 'lodash/fp';

const hasAll = curry((paths, obj) => paths.every(path => has(path, obj)));

const renameKeys = curry((pairs, obj) =>
  pairs.reduce((result, [prevKey, nextKey]) => {
    /* eslint-disable no-param-reassign */
    result[nextKey] = result[prevKey];
    delete result[prevKey];
    return result;
    /* eslint-enable no-param-reassign */
  }, Object.assign({}, obj)),
);

export { hasAll, renameKeys };
