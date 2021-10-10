import { TaxParameter } from './interfaces';

/**
 * Takes a Map create by createLookupMap and transforms it back into an array.
 */
export function createListFromLookupMap(lookupMap: Map<string, Map<string, TaxParameter>>): TaxParameter[] {
    const newList: TaxParameter[] = [];

    lookupMap.forEach((keyParameter) => {
        keyParameter.forEach((parameter) => {
            newList.push(parameter);
        });
    });

    return newList;
}
