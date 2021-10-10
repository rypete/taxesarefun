import { createParameterKey } from './createParameterKey';
import { TaxParameter, TaxParameterLookupMap } from './interfaces';

/**
 * Creates a Map (key value pair) which we can any parameter in o(1) time. This removes the need to iterate over the entire parameters array every time
 * we need to find a specific element.
 *
 * We use the Map key of "param.Key-param.TaxCode" as this will always be a unique identifier for the parameter.
 *
 * !!!Very important note: These values are by reference so they will point to the provided array. Modifying any of the values will modify the lists values!!!
 * We will use this to our benefit.
 *
 * An example of the shape:
 *
 * ```json
 * {
 *      Key1-TaxCode1: TaxParameter,
 *      Key1-TaxCode2: TaxParameter,
 *      Key2-TaxCode3: TaxParameter,
 *      Key2-TaxCode4: TaxParameter
 * }
 *
 * We can then query for any paramter using that unique key!
 * ```
 */
export function createLookupMap(parameters: TaxParameter[]): TaxParameterLookupMap {
    const lookupMap = new Map<string, TaxParameter>();

    // Iterate over all of the parameters
    for (const param of parameters) {
        const key: string = createParameterKey(param);

        lookupMap.set(key, param);
    }

    return lookupMap;
}
