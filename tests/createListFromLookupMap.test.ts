import { createListFromLookupMap } from '../src/createListFromLookupMap';
import { createLookupMap } from '../src/createLookupMap';
import { TaxParameter, TaxParameterLookupMap } from '../src/interfaces';
import { createParameter } from './utils/creators';

describe('createListFromLookupMap', () => {
    it('should return an array containing all of the `Key`s and `TaxCode`s in the provided Map', () => {
        const parameter: TaxParameterLookupMap = createLookupMap([createParameter('foo', 'bar', null)]);

        const result: TaxParameter[] = createListFromLookupMap(parameter);

        expect(result[0]).toEqual(createParameter('foo', 'bar', null));
    });
});
