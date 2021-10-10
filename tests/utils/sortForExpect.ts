import { TaxParameter } from '../../src/interfaces';

export function sortForExpect(list: TaxParameter[]) {
    const sorted = list
        .map((element) => {
            if (element.Values) {
                return {
                    ...element,
                    ...{ Values: element.Values.sort((a, b) => (a.Value > b.Value ? 1 : -1)) },
                };
            }

            return element;
        })
        .sort((a, b) => (`${a.Key}${a.TaxCode}` > `${b.Key}${b.TaxCode}` ? 1 : -1));

    return sorted;
}
