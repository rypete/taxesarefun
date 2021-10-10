import deepmerge from 'deepmerge';
import { TaxParameter, TaxParameterValue } from '../../src/interfaces';

export function createParameter(key: string, taxCode: string, values: (string | [string, boolean])[] | null): TaxParameter {
    const paramValues: TaxParameterValue[] = [];

    if (Array.isArray(values)) {
        values.forEach((value) => {
            if (Array.isArray(value)) {
                paramValues.push(createParameterValue(value[0], value[1]));
            } else {
                paramValues.push(createParameterValue(value));
            }
        });
    }

    const param: TaxParameter = {
        Key: key,
        TaxCode: taxCode,
        Values: paramValues.length > 0 ? paramValues : null,
        DefaultValue: '',
        Description: '',
        Required: true,
        StateCode: '',
        Type: 0,
    };

    return param;
}

export function createParameterValue(value: string, isFuture: boolean = false): TaxParameterValue {
    const paramValue: TaxParameterValue = {
        Description: '',
        IsFutureValue: isFuture,
        Value: value,
    };

    return paramValue;
}

const overwriteMerge = <T>(destinationArray: T, sourceArray: T) => sourceArray;
