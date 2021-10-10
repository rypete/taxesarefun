import { createParameterKey } from '../src/createParameterKey';
import { createLookupMap } from '../src/createLookupMap';
import { TaxParameter } from '../src/interfaces';
import { createParameter } from './utils/creators';

describe('createLookupMap', () => {
    it('should return a `Map` containing all of the provided parameter `Key`s', () => {
        const parameters: TaxParameter[] = [createParameter('foo', 'bar')];
        const result = createLookupMap(parameters);

        expect(result.get(createParameterKey(parameters[0]))).toEqual(createParameter('foo', 'bar'));
    });
});
