import { TaxParameter, TaxParameterLookupMap } from './interfaces';

/**
 * Creates a Map (key value pair) which we can query by Key then TaxCode to get elements in o(1) time (we remove the need to do a find on an entire array each time).
 * We split map by Key and byTaxCode because Keys will always be unique, and TaxCodes will always be unique within the Keys
 *
 * An example of the shape:
 *
 * ```ts
 * {
 *      Key1: {
 *          TaxCode1: TaxParameter
 *          TaxCode2: TaxParameter
 *      },
 *      Key2: {
 *          TaxCode3: TaxParameter
 *          TaxCode4: TaxParameter
 *      },
 * }
 *
 * We can then query by using Key1.TaxCode2 to get the parameter and its values.
 * ```
 */
export function createLookupMap(parameters: TaxParameter[]): TaxParameterLookupMap {
    const lookupMap = new Map<string, Map<string, TaxParameter>>();

    // Iterate over all of the parameters
    for (const param of parameters) {
        // Look if Key exists in our map
        const existingValue = lookupMap.get(param.Key);

        // If it does, then we add our current iterations TaxCode as a key to the sub map bc it already exists
        if (existingValue) {
            existingValue.set(param.TaxCode, param);
        } else {
            // If it doesnt exist, we need to create the sub map and add the current iterations tax code to it.
            const taxCodeMap = new Map<string, TaxParameter>();
            taxCodeMap.set(param.TaxCode, param);

            // Add the sub map to the primary map under our Key
            lookupMap.set(param.Key, taxCodeMap);
        }
    }

    return lookupMap;
}
