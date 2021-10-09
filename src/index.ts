import { AppendFutureParameters } from './appendFutureParameters';
import { TaxParameter } from './interfaces';

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

const current: TaxParameter[] = [
    {
        Key: '2020_W4',
        Description: '2020 W4',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: 'TRUE',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'TRUE',
                Description: 'True',
                IsFutureValue: false,
            },
            {
                Value: 'FALSE',
                Description: 'False',
                IsFutureValue: false,
            },
        ],
        StateCode: 'FED',
    },
    {
        Key: 'TOTALALLOWANCES',
        Description: 'Total Allowances',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0',
        Required: true,
        Type: 2,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'FILINGSTATUS',
        Description: 'Filing Status',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: 'S',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'S',
                Description: 'Single',
                IsFutureValue: false,
            },
            {
                Value: 'NRA',
                Description: 'Nonresident Alien',
                IsFutureValue: false,
            },
        ],
        StateCode: 'FED',
    },
    {
        Key: 'TWO_JOBS',
        Description: 'Two Jobs',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: 'FALSE',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'TRUE',
                Description: 'True',
                IsFutureValue: false,
            },
            {
                Value: 'FALSE',
                Description: 'False',
                IsFutureValue: false,
            },
        ],
        StateCode: 'FED',
    },
    {
        Key: 'MOST_RECENT_WH',
        Description: 'Most Recent Withholding Amount',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'DEPENDENTS_AMT',
        Description: 'Dependent Amount',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'OTHER_INCOME',
        Description: 'Other Income',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'DEDUCTIONS',
        Description: 'Deductions',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'NRA_EXEMPTION_AMT',
        Description: 'NRA Exemption Amount',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'FILINGSTATUS',
        Description: 'Filing Status',
        TaxCode: '08 - 000 - 0000 - SIT - 000',
        DefaultValue: 'S',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'S',
                Description: 'Single',
                IsFutureValue: false,
            },
            {
                Value: 'M',
                Description: 'Married',
                IsFutureValue: false,
            },
            {
                Value: 'MH',
                Description: 'Married Withhold at Higher Rate',
                IsFutureValue: false,
            },
            {
                Value: 'H',
                Description: 'Head of Household',
                IsFutureValue: false,
            },
        ],
        StateCode: 'CO',
    },
    {
        Key: 'POLITICALSUBDIVISION',
        Description: 'Colorado Political Subdivision',
        TaxCode: '08 - 000 - 0000 - ER_SUTA - 000',
        DefaultValue: 'FALSE',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'TRUE',
                Description: 'True',
                IsFutureValue: false,
            },
            {
                Value: 'FALSE',
                Description: 'False',
                IsFutureValue: false,
            },
        ],
        StateCode: 'CO',
    },
];

const future: TaxParameter[] = [
    {
        Key: '2020_W4',
        Description: '2020 W4',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: 'TRUE',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'TRUE',
                Description: 'True',
                IsFutureValue: false,
            },
            {
                Value: 'FALSE',
                Description: 'False',
                IsFutureValue: false,
            },
        ],
        StateCode: 'FED',
    },
    {
        Key: 'TOTALALLOWANCES',
        Description: 'Total Allowances',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0',
        Required: true,
        Type: 2,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'FILINGSTATUS',
        Description: 'Filing Status',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: 'S',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'S',
                Description: 'Single',
                IsFutureValue: false,
            },
            {
                Value: 'M',
                Description: 'Married',
                IsFutureValue: true,
            },
            {
                Value: 'H',
                Description: 'Head of Household',
                IsFutureValue: true,
            },
            {
                Value: 'NRA',
                Description: 'Nonresident Alien',
                IsFutureValue: false,
            },
        ],
        StateCode: 'FED',
    },
    {
        Key: 'TWO_JOBS',
        Description: 'Two Jobs',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: 'FALSE',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'TRUE',
                Description: 'True',
                IsFutureValue: false,
            },
            {
                Value: 'FALSE',
                Description: 'False',
                IsFutureValue: false,
            },
        ],
        StateCode: 'FED',
    },
    {
        Key: 'MOST_RECENT_WH',
        Description: 'Most Recent Withholding Amount',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'DEPENDENTS_AMT',
        Description: 'Dependent Amount',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'OTHER_INCOME',
        Description: 'Other Income',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'DEDUCTIONS',
        Description: 'Deductions',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'NRA_EXEMPTION_AMT',
        Description: 'NRA Exemption Amount',
        TaxCode: '00 - 000 - 0000 - FIT - 000',
        DefaultValue: '0.0',
        Required: true,
        Type: 1,
        Values: null,
        StateCode: 'FED',
    },
    {
        Key: 'FILINGSTATUS',
        Description: 'Filing Status',
        TaxCode: '08 - 000 - 0000 - SIT - 000',
        DefaultValue: 'S',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'S',
                Description: 'Single',
                IsFutureValue: false,
            },
            {
                Value: 'M',
                Description: 'Married',
                IsFutureValue: false,
            },
            {
                Value: 'MH',
                Description: 'Married Withhold at Higher Rate',
                IsFutureValue: false,
            },
            {
                Value: 'H',
                Description: 'Head of Household',
                IsFutureValue: false,
            },
        ],
        StateCode: 'CO',
    },
    {
        Key: 'POLITICALSUBDIVISION',
        Description: 'Colorado Political Subdivision',
        TaxCode: '08 - 000 - 0000 - ER_SUTA - 000',
        DefaultValue: 'FALSE',
        Required: true,
        Type: 3,
        Values: [
            {
                Value: 'TRUE',
                Description: 'True',
                IsFutureValue: false,
            },
            {
                Value: 'FALSE',
                Description: 'False',
                IsFutureValue: false,
            },
        ],
        StateCode: 'CO',
    },
];

console.log(JSON.stringify(AppendFutureParameters(current, future), null, 2));
