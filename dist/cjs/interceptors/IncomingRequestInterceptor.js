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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingRequestInterceptor = void 0;
var assert_never_1 = require("../utils/assert-never");
var __1 = require("..");
var Logger_1 = require("../utils/Logger");
var logger = new Logger_1.Logger('IncomingRequestInterceptor');
/**
 * @internalapi
 *
 * The IncomingRequestInterceptor is used in the WalletClient to intercept an incoming request and enrich it with data, like app metadata.
 */
var IncomingRequestInterceptor = /** @class */ (function () {
    function IncomingRequestInterceptor() {
    }
    /**
     * The method that is called during the interception
     *
     * @param config
     */
    IncomingRequestInterceptor.intercept = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var message, connectionInfo, appMetadataManager, interceptorCallback, _a, request, appMetadata, request, appMetadata, request, appMetadata, request;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        message = config.message, connectionInfo = config.connectionInfo, appMetadataManager = config.appMetadataManager, interceptorCallback = config.interceptorCallback;
                        // TODO: Remove v1 compatibility in later version
                        if (message.beaconId && !message.senderId) {
                            message.senderId = message.beaconId;
                            delete message.beaconId;
                        }
                        _a = message.type;
                        switch (_a) {
                            case __1.BeaconMessageType.PermissionRequest: return [3 /*break*/, 1];
                            case __1.BeaconMessageType.OperationRequest: return [3 /*break*/, 3];
                            case __1.BeaconMessageType.SignPayloadRequest: return [3 /*break*/, 5];
                            case __1.BeaconMessageType.BroadcastRequest: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 9];
                    case 1:
                        // TODO: Remove v1 compatibility in later version
                        if (message.appMetadata.beaconId && !message.appMetadata.senderId) {
                            message.appMetadata.senderId = message.appMetadata.beaconId;
                            delete message.appMetadata.beaconId;
                        }
                        return [4 /*yield*/, appMetadataManager.addAppMetadata(message.appMetadata)];
                    case 2:
                        _b.sent();
                        request = message;
                        interceptorCallback(request, connectionInfo);
                        return [3 /*break*/, 10];
                    case 3: return [4 /*yield*/, IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId)];
                    case 4:
                        appMetadata = _b.sent();
                        request = __assign({ appMetadata: appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                        return [3 /*break*/, 10];
                    case 5: return [4 /*yield*/, IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId)];
                    case 6:
                        appMetadata = _b.sent();
                        request = __assign({ appMetadata: appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, IncomingRequestInterceptor.getAppMetadata(appMetadataManager, message.senderId)];
                    case 8:
                        appMetadata = _b.sent();
                        request = __assign({ appMetadata: appMetadata }, message);
                        interceptorCallback(request, connectionInfo);
                        return [3 /*break*/, 10];
                    case 9:
                        logger.log('intercept', 'Message not handled');
                        assert_never_1.assertNever(message);
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    IncomingRequestInterceptor.getAppMetadata = function (appMetadataManager, senderId) {
        return __awaiter(this, void 0, void 0, function () {
            var appMetadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, appMetadataManager.getAppMetadata(senderId)];
                    case 1:
                        appMetadata = _a.sent();
                        if (!appMetadata) {
                            throw new Error('AppMetadata not found');
                        }
                        return [2 /*return*/, appMetadata];
                }
            });
        });
    };
    return IncomingRequestInterceptor;
}());
exports.IncomingRequestInterceptor = IncomingRequestInterceptor;
//# sourceMappingURL=IncomingRequestInterceptor.js.map