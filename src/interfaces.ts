export interface TaxParameter {
    Key: string;
    Description: string;
    TaxCode: string;
    DefaultValue: string;
    Required: boolean;
    Type: number;
    Values: TaxParameterValue[] | null;
    StateCode: string;
}

export interface TaxParameterValue {
    Value: string;
    Description: string;
    IsFutureValue: boolean;
}

export type TaxParameterLookupMap = Map<string, TaxParameter>;
