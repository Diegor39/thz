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
exports.migrate = void 0;
var constants_1 = require("../constants");
var __1 = require("..");
var migrate_0_7_0_1 = require("./migrate-0.7.0");
var migrations = [
    ['0.6.0', function () { return undefined; }],
    ['0.7.0', migrate_0_7_0_1.migrate_0_7_0]
];
// This is not used yet
exports.migrate = function (storage) { return __awaiter(void 0, void 0, void 0, function () {
    var lastSdkVersion, addMigration, _i, migrations_1, _a, version, migrationMethod, migrationError_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, storage.get(__1.StorageKey.BEACON_SDK_VERSION)
                // Skip if we are on latest version
            ];
            case 1:
                lastSdkVersion = _b.sent();
                // Skip if we are on latest version
                if (lastSdkVersion && lastSdkVersion === constants_1.SDK_VERSION) {
                    return [2 /*return*/];
                }
                addMigration = false;
                _i = 0, migrations_1 = migrations;
                _b.label = 2;
            case 2:
                if (!(_i < migrations_1.length)) return [3 /*break*/, 7];
                _a = migrations_1[_i], version = _a[0], migrationMethod = _a[1];
                if (version === lastSdkVersion) {
                    addMigration = true;
                }
                if (!addMigration) return [3 /*break*/, 6];
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, migrationMethod(storage)];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                migrationError_1 = _b.sent();
                console.log("Migration for " + version + " failed!", migrationError_1);
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [4 /*yield*/, storage.set(__1.StorageKey.BEACON_SDK_VERSION, constants_1.SDK_VERSION)];
            case 8:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=migrations.js.map