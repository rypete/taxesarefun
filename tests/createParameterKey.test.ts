import { createParameterKey } from '../src/createParameterKey';
import { TaxParameter } from '../src/interfaces';
import { createParameter } from './utils/creators';

describe('createParameterKey', () => {
    it('should return a key for the provided parameter', () => {
        const parameter: TaxParameter = createParameter('foo', 'bar', null);
        const key: string = createParameterKey(parameter);

        expect(key).toEqual('foo-bar');
    });
});
