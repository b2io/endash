import { isNil } from 'lodash/fp';

const isPresent = v => !isNil(v);

// eslint-disable-next-line import/prefer-default-export
export { isPresent };
