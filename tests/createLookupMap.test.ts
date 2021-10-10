import { createLookupMap } from '../src/createLookupMap';
import { TaxParameter } from '../src/interfaces';
import { createParameter } from './utils/creators';

describe('createLookupMap', () => {
    it('should return a `Map` containing all of the provided parameter `Key`s', () => {
        const parameters: TaxParameter[] = [createParameter('foo', 'bar', null)];
        const result = createLookupMap(parameters);

        expect(result.has('foo')).toEqual(true);
    });

    it('should return a `Map` containing all of the provided parameter `TaxCodes` as submaps of the primary `Key`', () => {
        const parameters: TaxParameter[] = [createParameter('foo', 'bar', null)];
        const result = createLookupMap(parameters);

        expect(result.get('foo')?.has('bar')).toEqual(true);
    });

    it('should return the complete `TaxParameter` when querying the `TaxCode` submap ', () => {
        const parameters: TaxParameter[] = [createParameter('foo', 'bar', null)];
        const result = createLookupMap(parameters);

        expect(result.get('foo')?.get('bar')).toEqual(createParameter('foo', 'bar', null));
    });
});
