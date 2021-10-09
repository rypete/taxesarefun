import deepmerge from 'deepmerge';
import { TaxParameter, TaxParameterValue } from '../../interfaces';

export function createMockParameter(values?: Partial<TaxParameter>): TaxParameter {
    const param: TaxParameter = {
        Key: '',
        TaxCode: '',
        Values: null,
        DefaultValue: '',
        Description: '',
        Required: true,
        StateCode: '',
        Type: 0,
    };

    if (values) {
        return deepmerge(param, values, { arrayMerge: overwriteMerge });
    }

    return param;
}

export function createMockParameterValue(values?: Partial<TaxParameterValue>): TaxParameterValue {
    const paramValue: TaxParameterValue = {
        Description: '',
        IsFutureValue: false,
        Value: '',
    };

    if (values) {
        return deepmerge(paramValue, values, { arrayMerge: overwriteMerge });
    }

    return paramValue;
}

const overwriteMerge = <T>(destinationArray: T, sourceArray: T) => sourceArray;
