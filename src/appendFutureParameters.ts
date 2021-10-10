import { createLookupMap } from './createLookupMap';
import { createParameterKey } from './createParameterKey';
import { TaxParameter, TaxParameterLookupMap, TaxParameterValue } from './interfaces';

export function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]): TaxParameter[] {
    // Create a lookup map for all of the future parameters.
    const futureParametersMap: TaxParameterLookupMap = createLookupMap(futureParameters);

    // Iterate over all of the currentParameters
    for (const currentParam of currentParameters) {
        // Attempt to get our current parameter from the future parameters lookup map
        const futureParamForCurrentParam: TaxParameter | undefined = futureParametersMap.get(createParameterKey(currentParam));

        // undefined | null = deleted
        if (futureParamForCurrentParam === undefined || futureParamForCurrentParam === null) {
            // if we are here, we have an orphaned current parameter so we add it back in to the future parameters
            futureParameters.push(currentParam);

            // Nothing more to do, go to next iteration
            continue;
        }

        // We now know that our current parameter exists in the future parameter, we can get the values.
        const futureParamValues: TaxParameterValue[] | null = futureParamForCurrentParam.Values;

        if (futureParamValues === null) {
            if (currentParam.Values !== null) {
                // If the future parameters values are null and our currents arent, add them back in

                // Note: This value is by reference, so the value will be updated in the map
                futureParamForCurrentParam.Values = currentParam.Values;
            }

            // Nothing more to do, go to next iteration
            continue;
        }

        // If we get here we know that future params values arent null, but our current param values are
        // so just accept all and mark as our currents new values.
        if (currentParam.Values === null) {
            futureParamForCurrentParam.Values = futureParamValues.map((futureParamValue) => {
                futureParamValue.IsFutureValue = true;
                return futureParamValue;
            });

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
        futureParamForCurrentParam.Values = currentParam.Values.concat(newFutureParamValues);
    }

    // Our future parameters map will have any new Keys and TaxCodes added by default
    // Then have any currents which were deleted added back
    // And any new parameter values marked true.
    return futureParameters;
}
