import { TaxParameter } from './interfaces';

/**
 * Creates a unique key for a TaxParameter
 */
export function createParameterKey(parameter: TaxParameter) {
    return `${parameter.Key}-${parameter.TaxCode}`;
}
