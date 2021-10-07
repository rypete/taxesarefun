import { TaxParameter } from './types';

// public IEnumerable<TaxParameter> AppendFutureParameters(IEnumerable<TaxParameter> currentParameters, IEnumerable<TaxParameter> futureParameters)
// {
//     foreach (TaxParameter currentParam in currentParameters)
//     {
//         if (currentParam.Values != null)
//         {
//             IEnumerable<string> currentValues = currentParam.Values.Select(x => x.Value);
//             TaxParameter futureParam = futureParameters.Where(x => x.Key == currentParam.Key && x.TaxCode == currentParam.TaxCode).FirstOrDefault();
//             if (futureParam?.Values != null)
//             {
//                 IEnumerable<TaxParameterValue> futureValues = futureParam.Values.Where(x => !currentValues.Contains(x.Value));
//                 futureValues.ToList().ForEach(x => x.IsFutureValue = true);
//                 currentParam.Values = currentParam.Values.Concat(futureValues);
//             }
//         }
//     }

//     IEnumerable<string> currentKeys = currentParameters.Select(x => x.Key);
//     IEnumerable<TaxParameter> futureParams = futureParameters.Where(x => !currentKeys.Contains(x.Key));
//     currentParameters = currentParameters.Concat(futureParams);

//     return currentParameters;
// }

function AppendFutureParameters(currentParameters: TaxParameter[], futureParameters: TaxParameter[]) {
    for (const currentParam of currentParameters) {
        if (currentParam.Values.length > 0) {
            const currentValues = currentParam.Values.map((x) => x.Value);
            const futureParam = futureParameters.find(
                (x) => x.Key === currentParam.Key && x.TaxCode === currentParam.TaxCode
            );

            if (futureParam) {
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

const current: TaxParameter[] = [
    {
        Key: '1',
        TaxCode: '1',
        Values: [
            { Value: 'foo1', IsFutureValue: false },
            { Value: 'bar1', IsFutureValue: false },
        ],
    },
    {
        Key: '2',
        TaxCode: '2',
        Values: [
            { Value: 'foo2', IsFutureValue: false },
            { Value: 'bar2', IsFutureValue: false },
        ],
    },
];

const future: TaxParameter[] = [
    {
        Key: '1',
        TaxCode: '1',
        Values: [
            { Value: 'foo1', IsFutureValue: false },
            { Value: 'bar1', IsFutureValue: false },
            { Value: 'baz1', IsFutureValue: false },
        ],
    },
    {
        Key: '2',
        TaxCode: '2',
        Values: [
            { Value: 'foo2', IsFutureValue: false },
            { Value: 'bar2', IsFutureValue: false },
        ],
    },
];

console.log(JSON.stringify(AppendFutureParameters(current, future), null, 4));
