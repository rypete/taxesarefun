import { TaxParameter, TaxParameterValue } from './types';

export function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]): TaxParameter[] {
    const currentParametersMap = createLookupMap(currentParameters);

    for (const futureParam of futureParameters) {
        if (futureParam == null || futureParam.Values == null) {
            continue;
        }

        const currentParamByKey = currentParametersMap.get(futureParam.Key);
        const currentParamByTaxCode: TaxParameter | null | undefined = currentParametersMap.get(futureParam.Key)?.get(futureParam.TaxCode);

        if (currentParamByKey === undefined) {
            const taxCodeMap = new Map();
            taxCodeMap.set(futureParam.TaxCode, futureParam);

            currentParametersMap.set(futureParam.Key, taxCodeMap);

            continue;
        } else if (currentParamByTaxCode === undefined) {
            currentParamByKey.set(futureParam.TaxCode, futureParam);

            continue;
        }

        // we've discovered future params, this might be a data error though
        if (currentParamByTaxCode.Values === null && futureParam.Values !== null) {
            currentParamByTaxCode.Values = futureParam.Values;
            continue;
        }

        if (currentParamByTaxCode.Values == null || currentParamByTaxCode.Values.length == futureParam.Values.length) {
            continue;
        }

        const currentParamValueMap: Map<string, TaxParameterValue> = new Map<string, TaxParameterValue>();

        // Populate the current param lookup map
        for (const value of currentParamByTaxCode.Values) {
            currentParamValueMap.set(value.Value, value);
        }

        for (const futureParamValue of futureParam.Values) {
            const existingValue = currentParamValueMap.get(futureParamValue.Value);

            if (!existingValue) {
                futureParamValue.IsFutureValue = true;
                currentParamValueMap.set(futureParamValue.Value, futureParamValue);
            }
        }

        currentParamByTaxCode.Values = Array.from(currentParamValueMap.values());
    }

    // construct back into array
}

//     const futureParametersMap = createLookupMap(futureParameters);

//     // Iterate over all of the currentParameters
//     for (const currentParam of currentParameters) {
//         // If the current param is null or its values are null then we can skip this iteration
//         if (currentParam == null || currentParam.Values == null) {
//             continue;
//         }

//         // Get the future param values from the lookup map corresponding to our current param Key and TaxCode. If the Key or TaxCode is not found in the lookup we will get undefined.
//         const futureParamValues: TaxParameterValue[] | null | undefined = futureParametersMap.get(currentParam.Key)?.get(currentParam.TaxCode);

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

export function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]): TaxParameter[] {
    const futureParametersMap = createLookupMap(futureParameters);

    // Iterate over all of the currentParameters
    for (const currentParam of currentParameters) {
        // If the current param is null or its values are null then we can skip this iteration
        if (currentParam == null || currentParam.Values == null) {
            continue;
        }

        // Get the future param values from the lookup map corresponding to our current param Key and TaxCode. If the Key or TaxCode is not found in the lookup we will get undefined.
        const futureParamValues: TaxParameterValue[] | null | undefined = futureParametersMap.get(currentParam.Key)?.get(currentParam.TaxCode)?.Values;

        // If the future param is undefined it could mean either this key or this tax code has been removed...
        // Skip iteration
        if (futureParamValues == undefined) {
            continue;
        }

        // If the futureParams values are null or the current params values are equal length to the future params,
        // we know theres nothing to do so we can skip this iteration
        if (futureParamValues == null || currentParam.Values.length == futureParamValues.length) {
            continue;
        }

        // Create a lookup map of our current params values so we dont have to iterate the entire array for each future param value.
        // The map will be keyed by each values Value and have the value of the entire Value
        // We use a map of the current param values and not the futures as this will always be shorter in the length, meaning if we do a get and it returns undefined, its new.
        const currentParamValueMap: Map<string, TaxParameterValue> = new Map<string, TaxParameterValue>();

        // Populate the current param lookup map
        for (const value of currentParam.Values) {
            currentParamValueMap.set(value.Value, value);
        }

        // Iterate over all of the future parameter values
        for (const futureParamValue of futureParamValues) {
            // Check if our current future param value is in our current params values lookup map
            const existingValue = currentParamValueMap.get(futureParamValue.Value);

            // If it is not, then we know its new! Mark it as true and add it to lookup table to be transformed back in the next step.
            if (!existingValue) {
                futureParamValue.IsFutureValue = true;
                currentParamValueMap.set(futureParamValue.Value, futureParamValue);
            }
        }

        // Transform the current param values lookup table back into an array and update the current param iteration (in place)
        // This will include any new values added from above.
        currentParam.Values = Array.from(currentParamValueMap.values());
    }

    // Return the update current parameters back.
    return currentParameters;
}

/**
 * Creates a Map (key value pair) which we can query by Key then TaxCode to get elements without having to iterate a parameters array each time.
 *
 * An example of the shape:
 *
 * ```ts
 * {
 *      Key1: {
 *          TaxCode1: [ParameterValue1, ParameterValue2, ParameterValue3]
 *          TaxCode2: [ParameterValue1, ParameterValue2, ParameterValue3]
 *      },
 *      Key2: {
 *          TaxCode3: [ParameterValue1, ParameterValue2, ParameterValue3]
 *          TaxCode4: [ParameterValue1, ParameterValue2, ParameterValue3]
 *      },
 * }
 *
 * We can then query by using Key1.TaxCode2 to get all of its values.
 * ```
 */
// function createLookupMap(parameters: TaxParameter[]) {
//     const lookupMap = new Map<string, Map<string, TaxParameterValue[] | null>>();

//     // Iterate over all of the parameters
//     for (const param of parameters) {
//         // Look if Key exists in our map
//         const existingValue = lookupMap.get(param.Key);

//         // If it does, then we add our current iterations TaxCode as a key to the sub map bc it already exists
//         if (existingValue) {
//             existingValue.set(param.TaxCode, param.Values);
//         } else {
//             // If it doesnt exist, we need to create the sub map and add the current iterations tax code to it.
//             const taxCodeMap = new Map<string, TaxParameterValue[] | null>();
//             taxCodeMap.set(param.TaxCode, param.Values);

//             // Add the sub map to the primary map under our Key
//             lookupMap.set(param.Key, taxCodeMap);
//         }
//     }

//     return lookupMap;
// }
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
