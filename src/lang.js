import { isNil } from 'lodash/fp';

const isDefined = v => v !== undefined;

const isPresent = v => !isNil(v);

export { isDefined, isPresent };
