"use strict";
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
exports.LocalStorage = void 0;
var StorageKeyReturnDefaults_1 = require("../types/storage/StorageKeyReturnDefaults");
/**
 * @internalapi
 *
 * A storage that can be used in the browser
 */
var LocalStorage = /** @class */ (function () {
    function LocalStorage(prefix) {
        this.prefix = prefix;
    }
    LocalStorage.isSupported = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(Boolean(typeof window !== 'undefined') && Boolean(window.localStorage))];
            });
        });
    };
    LocalStorage.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = localStorage.getItem(this.getPrefixedKey(key));
                if (!value) {
                    if (typeof StorageKeyReturnDefaults_1.defaultValues[key] === 'object') {
                        return [2 /*return*/, JSON.parse(JSON.stringify(StorageKeyReturnDefaults_1.defaultValues[key]))];
                    }
                    else {
                        return [2 /*return*/, StorageKeyReturnDefaults_1.defaultValues[key]];
                    }
                }
                else {
                    try {
                        return [2 /*return*/, JSON.parse(value)];
                    }
                    catch (jsonParseError) {
                        return [2 /*return*/, value]; // TODO: Validate storage
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof value === 'string') {
                    return [2 /*return*/, localStorage.setItem(this.getPrefixedKey(key), value)];
                }
                else {
                    return [2 /*return*/, localStorage.setItem(this.getPrefixedKey(key), JSON.stringify(value))];
                }
                return [2 /*return*/];
            });
        });
    };
    LocalStorage.prototype.delete = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(localStorage.removeItem(this.getPrefixedKey(key)))];
            });
        });
    };
    LocalStorage.prototype.getPrefixedKey = function (key) {
        return this.prefix ? this.prefix + "-" + key : key;
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=LocalStorage.js.map