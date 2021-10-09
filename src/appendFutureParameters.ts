import { TaxParameter, TaxParameterValue } from './interfaces';

// map currents, iterate futures, no merge

// export function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]): TaxParameter[] {
//     const currentParametersMap = createLookupMap(currentParameters);

//     for (const futureParam of futureParameters) {
//         if (futureParam == null || futureParam.Values == null) {
//             continue;
//         }

//         const currentParamByKey = currentParametersMap.get(futureParam.Key);
//         const currentParamByTaxCode: TaxParameter | null | undefined = currentParametersMap.get(futureParam.Key)?.get(futureParam.TaxCode);

//         if (currentParamByKey === undefined) {
//             const taxCodeMap = new Map();
//             taxCodeMap.set(futureParam.TaxCode, futureParam);

//             currentParametersMap.set(futureParam.Key, taxCodeMap);

//             continue;
//         } else if (currentParamByTaxCode === undefined) {
//             currentParamByKey.set(futureParam.TaxCode, futureParam);

//             continue;
//         }

//         // we've discovered future params, this might be a data error though
//         if (currentParamByTaxCode.Values === null && futureParam.Values !== null) {
//             currentParamByTaxCode.Values = futureParam.Values;
//             continue;
//         }

//         if (currentParamByTaxCode.Values == null || currentParamByTaxCode.Values.length == futureParam.Values.length) {
//             continue;
//         }

//         const currentParamValueMap: Map<string, TaxParameterValue> = new Map<string, TaxParameterValue>();

//         // Populate the current param lookup map
//         for (const value of currentParamByTaxCode.Values) {
//             currentParamValueMap.set(value.Value, value);
//         }

//         for (const futureParamValue of futureParam.Values) {
//             const existingValue = currentParamValueMap.get(futureParamValue.Value);

//             if (!existingValue) {
//                 futureParamValue.IsFutureValue = true;
//                 currentParamValueMap.set(futureParamValue.Value, futureParamValue);
//             }
//         }

//         currentParamByTaxCode.Values = Array.from(currentParamValueMap.values());
//     }

//     // construct back into array
// }

// //=============== map futures, iterate currents, no merge
// export function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]): TaxParameter[] {
//     const futureParametersMap = createLookupMap(futureParameters);

//     // Iterate over all of the currentParameters
//     for (const currentParam of currentParameters) {
//         // If the current param is null or its values are null then we can skip this iteration
//         if (currentParam == null || currentParam.Values == null) {
//             continue;
//         }

//         // Get the future param values from the lookup map corresponding to our current param Key and TaxCode. If the Key or TaxCode is not found in the lookup we will get undefined.
//         const futureParamValues: TaxParameterValue[] | null | undefined = futureParametersMap.get(currentParam.Key)?.get(currentParam.TaxCode)?.Values;

//         // If the future param is undefined it could mean either this key or this tax code has been removed...
//         // Skip iteration
//         if (futureParamValues == undefined) {
//             continue;
//         }

//         // If the futureParams values are null or the current params values are equal length to the future params,
//         // we know theres nothing to do so we can skip this iteration
//         if (futureParamValues == null || currentParam.Values.length == futureParamValues.length) {
//             continue;
//         }

//         // Create a lookup map of our current params values so we dont have to iterate the entire array for each future param value.
//         // The map will be keyed by each values Value and have the value of the entire Value
//         // We use a map of the current param values and not the futures as this will always be shorter in the length, meaning if we do a get and it returns undefined, its new.
//         const currentParamValueMap: Map<string, TaxParameterValue> = new Map<string, TaxParameterValue>();

//         // Populate the current param lookup map
//         for (const value of currentParam.Values) {
//             currentParamValueMap.set(value.Value, value);
//         }

//         // Iterate over all of the future parameter values
//         for (const futureParamValue of futureParamValues) {
//             // Check if our current future param value is in our current params values lookup map
//             const existingValue = currentParamValueMap.get(futureParamValue.Value);

//             // If it is not, then we know its new! Mark it as true and add it to lookup table to be transformed back in the next step.
//             if (!existingValue) {
//                 futureParamValue.IsFutureValue = true;
//                 currentParamValueMap.set(futureParamValue.Value, futureParamValue);
//             }
//         }

//         // Transform the current param values lookup table back into an array and update the current param iteration (in place)
//         // This will include any new values added from above.
//         currentParam.Values = Array.from(currentParamValueMap.values());
//     }

//     // Return the update current parameters back.
//     return currentParameters;
// }

//=============== map futures, iterate currents, no merge

export function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]): TaxParameter[] {
    const futureParametersMap = createLookupMap(futureParameters);

    // Iterate over all of the currentParameters
    for (const currentParam of currentParameters) {
        // If the current param is null or its values are null then we can skip this iteration
        if (currentParam == null || currentParam.Values == null) {
            continue;
        }

        // Get our current parameters Key from the futures map
        const futureParamByKey: Map<string, TaxParameter> | undefined = futureParametersMap.get(currentParam.Key);

        // undefined | null = deleted
        if (futureParamByKey === undefined || futureParamByKey === null) {
            // if we are here, we have an orphaned current parameter by key so we add it back to the futures

            const taxCodeMap = new Map();
            taxCodeMap.set(currentParam.TaxCode, currentParam);

            futureParametersMap.set(currentParam.TaxCode, taxCodeMap);

            // Nothing more to do, go to next iteration
            continue;
        }

        // Since we know our current parameters key exists, we will try and get the tax code now.
        const futureParamByTaxCode: TaxParameter | null | undefined = futureParamByKey.get(currentParam.TaxCode);

        // undefined | null = deleted
        if (futureParamByTaxCode === undefined || futureParamByTaxCode === null) {
            // if we are here, we have an orphaned current parameter by taxcode so we add it back to the future parameter under the existing key.
            futureParamByKey.set(currentParam.TaxCode, currentParam);

            // Nothing more to do, go to next iteration;
            continue;
        }

        // We now know that our current parameters Key and TaxCode exist, so we can get the values.
        const futureParamValues: TaxParameterValue[] | null = futureParamByTaxCode.Values;

        if (futureParamValues === null) {
            if (currentParam.Values !== null) {
                // If the future parameters values are null and our currents arent, add them back in

                // Note: This value is by reference, so the value will be updated in the map
                futureParamByTaxCode.Values = currentParam.Values;
            }

            // Nothing more to do, go to next iteration
            continue;
        }

        // At this point we can be in one of the following states:
        // * current param values length === future param values length
        //      * This could mean that nothing was added nor removed
        //      * It could also mean that 1 element was added AND removed
        // * current param values length < future param values length
        //      * This could mean only futures were added
        //      * Or currents were removed
        //      * Or currents were removed AND futures added
        //
        // Either way the checks are similiar, but we must assume the worst case that something was added and removed, and pay the compute price.

        // Create a map of the future param values for lookup.
        const futureParamValuesMap = new Map<string, TaxParameterValue>();

        for (const futureParamValue of futureParamValues) {
            futureParamValuesMap.set(futureParamValue.Value, futureParamValue);
        }

        // Loop through our current param values
        for (const currentParamValue of currentParam.Values) {
            if (futureParamValuesMap.has(currentParamValue.Value)) {
                // If our current param value is in the future params, remove it from the future params local map.
                // This will eventually leave us with only the new future parameters.
                futureParamValuesMap.delete(currentParamValue.Value);
            }
        }

        // The only future params left in the local map will be new ones. Mark all of them.
        // Note:` Map.values()` returns an iterator and not an array, so we must use `Array.from()` to turn it into one.
        const newFutureParamValues: TaxParameterValue[] = Array.from(futureParamValuesMap.values()).map((futureParamValue) => {
            futureParamValue.IsFutureValue = true;
            return futureParamValue;
        });

        // Concat the currents (to restore any deleted values) with the new future params
        // Note: this value is by reference so the primary future parameters map will be updated.
        futureParamByTaxCode.Values = currentParam.Values.concat(newFutureParamValues);
    }

    // Our future parameters map will have any new Keys and TaxCodes added by default
    // Then have any currents which were deleted added back
    // And any new parameter values marked true.
    // We now need to transform our map back to an array and return;
    return createListFromLookupMap(futureParametersMap);
}

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
function createLookupMap(parameters: TaxParameter[]) {
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

/**
 * Takes a Map create by createLookupMap and transforms it back into an array.
 */
function createListFromLookupMap(lookupMap: Map<string, Map<string, TaxParameter>>): TaxParameter[] {
    const newList: TaxParameter[] = [];

    lookupMap.forEach((keyParameter) => {
        keyParameter.forEach((parameter) => {
            newList.push(parameter);
        });
    });

    return newList;
}
