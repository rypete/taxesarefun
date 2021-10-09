"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppendFutureParameters = void 0;
function AppendFutureParameters(currentParameters, futureParameters) {
    var _a;
    var futureParametersMap = new Map();
    for (var _i = 0, futureParameters_1 = futureParameters; _i < futureParameters_1.length; _i++) {
        var futureParam = futureParameters_1[_i];
        var existingValue = futureParametersMap.get(futureParam.Key);
        if (existingValue) {
            existingValue.set(futureParam.TaxCode, futureParam.Values);
        }
        else {
            var taxCodeMap = new Map([[futureParam.TaxCode, futureParam.Values]]);
            futureParametersMap.set(futureParam.Key, taxCodeMap);
        }
    }
    for (var _b = 0, currentParameters_1 = currentParameters; _b < currentParameters_1.length; _b++) {
        var currentParam = currentParameters_1[_b];
        if (currentParam !== null && currentParam.Values !== null) {
            var futureParam = (_a = futureParametersMap.get(currentParam.Key)) === null || _a === void 0 ? void 0 : _a.get(currentParam.TaxCode);
            if (futureParam) {
                var currentParamValueMap = new Map(currentParam.Values.map(function (x) { return [x.Value, x]; }));
                var paramUpdated = false;
                for (var _c = 0, futureParam_1 = futureParam; _c < futureParam_1.length; _c++) {
                    var futureParamValue = futureParam_1[_c];
                    var existingValue = currentParamValueMap.get(futureParamValue.Value);
                    if (!existingValue) {
                        futureParamValue.IsFutureValue = true;
                        currentParamValueMap.set(futureParamValue.Value, futureParamValue);
                        paramUpdated = true;
                    }
                }
                if (paramUpdated) {
                    currentParam.Values = Array.from(currentParamValueMap.values());
                }
            }
        }
    }
    return currentParameters;
}
exports.AppendFutureParameters = AppendFutureParameters;
