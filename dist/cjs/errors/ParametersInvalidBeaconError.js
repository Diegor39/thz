"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametersInvalidBeaconError = void 0;
var __1 = require("..");
/**
 * @category Error
 */
var ParametersInvalidBeaconError = /** @class */ (function (_super) {
    __extends(ParametersInvalidBeaconError, _super);
    function ParametersInvalidBeaconError() {
        var _this = _super.call(this, __1.BeaconErrorType.PARAMETERS_INVALID_ERROR, 'Some of the parameters you provided are invalid and the request could not be completed. Please check your inputs and try again.') || this;
        _this.name = 'ParametersInvalidBeaconError';
        _this.title = 'Parameters Invalid';
        return _this;
    }
    return ParametersInvalidBeaconError;
}(__1.BeaconError));
exports.ParametersInvalidBeaconError = ParametersInvalidBeaconError;
//# sourceMappingURL=ParametersInvalidBeaconError.js.map