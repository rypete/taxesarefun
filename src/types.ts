export interface TaxParameter {
    Key: string;
    TaxCode: string;
    Values: TaxParameterValue[];
}

export interface TaxParameterValue {
    Value: string;
    IsFutureValue: boolean;
}
