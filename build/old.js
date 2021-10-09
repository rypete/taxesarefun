"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function AppendFutureParameters(currentParameters, futureParameters) {
    var _loop_1 = function (currentParam) {
        if (currentParam.Values !== null && currentParam.Values.length > 0) {
            var currentValues_1 = currentParam.Values.map(function (x) { return x.Value; });
            var futureParam = futureParameters.find(function (x) { return x.Key === currentParam.Key && x.TaxCode === currentParam.TaxCode; });
            if (futureParam && futureParam.Values) {
                var futureValues = futureParam.Values.filter(function (x) { return !currentValues_1.includes(x.Value); }).map(function (x) { return (__assign(__assign({}, x), { IsFutureValue: true })); });
                currentParam.Values = currentParam.Values.concat(futureValues);
            }
        }
    };
    for (var _i = 0, currentParameters_1 = currentParameters; _i < currentParameters_1.length; _i++) {
        var currentParam = currentParameters_1[_i];
        _loop_1(currentParam);
    }
    return currentParameters;
}
