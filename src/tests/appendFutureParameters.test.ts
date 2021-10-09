import { AppendFutureParameters } from '../appendFutureParameters';
import { TaxParameter, TaxParameterValue } from '../interfaces';
import { createMockParameter, createMockParameterValue } from './utils/creators';

describe('appendFutureParameters', () => {
    it('should mark new parameter values with true', () => {
        const currentParameters: TaxParameter[] = [
            createMockParameter({ Key: 'foo', TaxCode: 'bar', Values: [createMockParameterValue({ Value: 'baz' })] }),
            createMockParameter({ Key: 'foo2', TaxCode: 'bar2', Values: [createMockParameterValue({ Value: 'baz2' })] }),
        ];

        const futureParameters: TaxParameter[] = [
            createMockParameter({ Key: 'foo', TaxCode: 'bar', Values: [createMockParameterValue({ Value: 'baz' }), createMockParameterValue({ Value: 'bax' })] }),
            createMockParameter({ Key: 'foo2', TaxCode: 'bar2', Values: [createMockParameterValue({ Value: 'baz2' })] }),
        ];

        const results = AppendFutureParameters(currentParameters, futureParameters);

        expect(results).toEqual([
            createMockParameter({
                Key: 'foo',
                TaxCode: 'bar',
                Values: [createMockParameterValue({ Value: 'baz' }), createMockParameterValue({ Value: 'bax', IsFutureValue: true })],
            }),
            createMockParameter({ Key: 'foo2', TaxCode: 'bar2', Values: [createMockParameterValue({ Value: 'baz2' })] }),
        ]);
    });

    it('should add new key parameters', () => {
        const currentParameters: TaxParameter[] = [
            createMockParameter({ Key: 'foo', TaxCode: 'bar', Values: [createMockParameterValue({ Value: 'baz' })] }),
            createMockParameter({ Key: 'foo2', TaxCode: 'bar2', Values: [createMockParameterValue({ Value: 'baz2' })] }),
        ];

        const futureParameters: TaxParameter[] = currentParameters.concat(
            createMockParameter({ Key: 'foo3', TaxCode: 'bar3', Values: [createMockParameterValue({ Value: 'baz2' })] })
        );

        const results = AppendFutureParameters(currentParameters, futureParameters);

        expect(results).toEqual(futureParameters);
    });

    it('should add new taxcode parameters under existing keys', () => {
        const currentParameters: TaxParameter[] = [
            createMockParameter({ Key: 'foo', TaxCode: 'bar', Values: [createMockParameterValue({ Value: 'baz' })] }),
            createMockParameter({ Key: 'foo2', TaxCode: 'bar2', Values: [createMockParameterValue({ Value: 'baz2' })] }),
        ];

        const futureParameters: TaxParameter[] = currentParameters.concat(
            createMockParameter({ Key: 'foo', TaxCode: 'bar3', Values: [createMockParameterValue({ Value: 'baz2' })] })
        );

        const results = AppendFutureParameters(currentParameters, futureParameters);

        expect(results).toEqual(futureParameters);
    });

    it('should retain existing current parameters if they are removed in future', () => {
        const currentParameters: TaxParameter[] = [
            createMockParameter({ Key: 'foo', TaxCode: 'bar', Values: [createMockParameterValue({ Value: 'baz' })] }),
            createMockParameter({ Key: 'foo2', TaxCode: 'bar2', Values: [createMockParameterValue({ Value: 'baz2' })] }),
        ];

        const futureParameters: TaxParameter[] = currentParameters.slice();

        const expectedParameters = futureParameters.slice();
        delete futureParameters[0];

        const results = AppendFutureParameters(currentParameters, futureParameters);

        expect(results).toEqual(expectedParameters);
    });
});
