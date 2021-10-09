import { TaxParameter } from './interfaces';

function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]) {
    for (const currentParam of currentParameters) {
        if (currentParam.Values !== null && currentParam.Values.length > 0) {
            const currentValues = currentParam.Values.map((x) => x.Value);
            const futureParam = futureParameters.find((x) => x.Key === currentParam.Key && x.TaxCode === currentParam.TaxCode);

            if (futureParam && futureParam.Values) {
                const futureValues = futureParam.Values.filter((x) => !currentValues.includes(x.Value)).map((x) => ({
                    ...x,
                    IsFutureValue: true,
                }));

                currentParam.Values = currentParam.Values.concat(futureValues);
            }
        }
    }

    return currentParameters;
}
