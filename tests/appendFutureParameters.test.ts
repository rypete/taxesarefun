import { AppendFutureParameters } from '../src/appendFutureParameters';
import { TaxParameter, TaxParameterValue } from '../src/interfaces';
import { createParameter, createParameterValue } from './utils/creators';
import { sortForExpect } from './utils/sortForExpect';

describe('appendFutureParameters', () => {
    describe('when adding new parameter values with no removals', () => {
        it('should mark a new parameter value with `IsFutureValue: true`', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
            const futureParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz', 'bax'])];

            const results = sortForExpect(AppendFutureParameters(currentParameters, futureParameters));
            const expected = sortForExpect([createParameter('foo', 'bar', ['baz', ['bax', true]])]);

            expect(results).toEqual(expected);
        });

        it('should mark many new parameter values with `IsFutureValue: true`', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
            const futureParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz', 'bax', 'bat'])];

            const expected: TaxParameter[] = sortForExpect([createParameter('foo', 'bar', ['baz', ['bax', true], ['bat', true]])]);
            const results = sortForExpect(AppendFutureParameters(currentParameters, futureParameters));

            expect(results).toEqual(expected);
        });

        it('should change nothing if the current params values and future params values are the same', () => {
            const current = [createParameter('foo', 'bar', ['baz'])];
            const future = current.slice();

            const results = sortForExpect(AppendFutureParameters(current, future));
            const expected = sortForExpect(current);

            expect(results).toEqual(expected);
        });
    });

    describe('when adding new parameters to future parameters', () => {
        it('should merge with current parameters when the future parameter has a new `Key`', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
            const futureParameters: TaxParameter[] = currentParameters.concat(createParameter('foo2', 'bar', null));

            const results = sortForExpect(AppendFutureParameters(currentParameters, futureParameters));
            const expected = sortForExpect(futureParameters);

            expect(results).toEqual(expected);
        });

        it('should merge with current parameters when the future parameter has an existing `Key` and has a new `TaxCode`', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
            const futureParameters: TaxParameter[] = currentParameters.concat(createParameter('foo', 'bar2', null));

            const results = AppendFutureParameters(currentParameters, futureParameters);
            const expected = sortForExpect(futureParameters);

            expect(sortForExpect(results)).toEqual(expected);
        });

        it('should merge with current parameters when the future parameter has a new `Key` and new `TaxCode`', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
            const futureParameters: TaxParameter[] = currentParameters.concat(createParameter('foo2', 'bar2', null));

            const results = AppendFutureParameters(currentParameters, futureParameters);
            const expected = sortForExpect(futureParameters);

            expect(sortForExpect(results)).toEqual(expected);
        });
    });

    describe('when future parameters have a removal', () => {
        it('should retain existing current parameters when a `Key` was removed', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];

            const futureParameters: TaxParameter[] = [];

            const results = sortForExpect(AppendFutureParameters(currentParameters, futureParameters));
            const expected = sortForExpect(currentParameters);

            expect(results).toEqual(expected);
        });

        it('should retain existing current parameters when a `TaxCode` was removed under an existing `Key`', () => {
            const currentParameters: TaxParameter[] = [createParameter('foo', 'bar', ['baz']), createParameter('foo', 'bar2', ['baz'])];

            const futureParameters: TaxParameter[] = currentParameters.slice(0, 1);

            const results = sortForExpect(AppendFutureParameters(currentParameters, futureParameters));
            const expected = sortForExpect(currentParameters);

            expect(results).toEqual(expected);
        });

        it('should retain the current parameters value when it has been removed in the future parameter', () => {
            const current: TaxParameter[] = [createParameter('foo', 'bar', ['baz', 'bax'])];
            const future: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];

            const results = sortForExpect(AppendFutureParameters(current, future));
            const expected = sortForExpect(current);

            expect(results).toEqual(expected);
        });

        it('should merge when a current parameter value has been removed and a new parameter value added in future parameters', () => {
            const current: TaxParameter[] = [createParameter('foo', 'bar', ['baz'])];
            const future: TaxParameter[] = [createParameter('foo', 'bar', ['bax'])];

            const results = sortForExpect(AppendFutureParameters(current, future));
            const expected = sortForExpect([createParameter('foo', 'bar', ['baz', ['bax', true]])]);

            expect(results).toEqual(expected);
        });
    });

    describe('when some params have null values', () => {
        it('should do return the current parameters when current params value is null and the future params value is null', () => {
            const current = [createParameter('foo', 'bar', null)];
            const future = [createParameter('foo', 'bar', null)];

            const results = sortForExpect(AppendFutureParameters(current, future));
            const expected = sortForExpect(future);

            expect(results).toEqual(expected);
        });

        it('should use the future parameters value when the current params values are null', () => {
            const current = [createParameter('foo', 'bar', null)];
            const future = [createParameter('foo', 'bar', ['baz'])];

            const results = sortForExpect(AppendFutureParameters(current, future));
            const expected = sortForExpect([createParameter('foo', 'bar', [['baz', true]])]);

            expect(results).toEqual(expected);
        });

        it('should retain the current param values when the future param values are null', () => {
            const current = [createParameter('foo', 'bar', ['baz'])];
            const future = [createParameter('foo', 'bar', null)];

            const results = sortForExpect(AppendFutureParameters(current, future));
            const expected = sortForExpect(current);

            expect(results).toEqual(expected);
        });
    });
});
