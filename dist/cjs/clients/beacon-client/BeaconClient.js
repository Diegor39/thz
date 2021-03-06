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
exports.BeaconClient = void 0;
var exposed_promise_1 = require("../../utils/exposed-promise");
var generate_uuid_1 = require("../../utils/generate-uuid");
var crypto_1 = require("../../utils/crypto");
var __1 = require("../..");
var events_1 = require("../../events");
var constants_1 = require("../../constants");
var MockWindow_1 = require("../../MockWindow");
/**
 * @internalapi
 *
 * The beacon client is an abstract client that handles everything that is shared between all other clients.
 * Specifically, it handles managing the beaconId and and the local keypair.
 */
var BeaconClient = /** @class */ (function () {
    function BeaconClient(config) {
        /** The beaconId is a public key that is used to identify one specific application (dapp or wallet).
         * This is used inside a message to specify the sender, for example.
         */
        this._beaconId = new exposed_promise_1.ExposedPromise();
        this.events = new events_1.BeaconEventHandler();
        /**
         * The local keypair that is used for the communication encryption
         */
        this._keyPair = new exposed_promise_1.ExposedPromise();
        if (!config.name) {
            throw new Error('Name not set');
        }
        if (!config.storage) {
            throw new Error('Storage not set');
        }
        this.name = config.name;
        this.iconUrl = config.iconUrl;
        this.appUrl = config.appUrl;
        this.storage = config.storage;
        // TODO: This is a temporary "fix" to prevent users from creating multiple Client instances
        if (MockWindow_1.windowRef.beaconCreatedClientInstance) {
            console.warn('[BEACON] It looks like you created multiple Beacon SDK Client instances. This can lead to problems. Only create one instance and re-use it everywhere.');
        }
        else {
            ;
            MockWindow_1.windowRef.beaconCreatedClientInstance = true;
        }
        this.initSDK().catch(console.error);
    }
    Object.defineProperty(BeaconClient.prototype, "beaconId", {
        get: function () {
            return this._beaconId.promise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BeaconClient.prototype, "keyPair", {
        get: function () {
            return this._keyPair.promise;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * This resets the SDK. After using this method, this instance is no longer usable. You will have to instanciate a new client.
     */
    BeaconClient.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.removeBeaconEntriesFromStorage()];
                    case 1:
                        _a.sent();
                        MockWindow_1.windowRef.beaconCreatedClientInstance = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method initializes the SDK by setting some values in the storage and generating a keypair.
     */
    BeaconClient.prototype.initSDK = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.storage.set(__1.StorageKey.BEACON_SDK_VERSION, constants_1.SDK_VERSION).catch(console.error);
                this.loadOrCreateBeaconSecret().catch(console.error);
                return [2 /*return*/, this.keyPair.then(function (keyPair) {
                        _this._beaconId.resolve(crypto_1.toHex(keyPair.publicKey));
                    })];
            });
        });
    };
    /**
     * Removes all beacon values from the storage.
     */
    BeaconClient.prototype.removeBeaconEntriesFromStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allKeys;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allKeys = Object.values(__1.StorageKey);
                        return [4 /*yield*/, Promise.all(allKeys.map(function (key) { return _this.storage.delete(key); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method tries to load the seed from storage, if it doesn't exist, a new one will be created and persisted.
     */
    BeaconClient.prototype.loadOrCreateBeaconSecret = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storageValue, _a, _b, key, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.storage.get(__1.StorageKey.BEACON_SDK_SECRET_SEED)];
                    case 1:
                        storageValue = _e.sent();
                        if (!(storageValue && typeof storageValue === 'string')) return [3 /*break*/, 3];
                        _b = (_a = this._keyPair).resolve;
                        return [4 /*yield*/, crypto_1.getKeypairFromSeed(storageValue)];
                    case 2:
                        _b.apply(_a, [_e.sent()]);
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, generate_uuid_1.generateGUID()];
                    case 4:
                        key = _e.sent();
                        return [4 /*yield*/, this.storage.set(__1.StorageKey.BEACON_SDK_SECRET_SEED, key)];
                    case 5:
                        _e.sent();
                        _d = (_c = this._keyPair).resolve;
                        return [4 /*yield*/, crypto_1.getKeypairFromSeed(key)];
                    case 6:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return BeaconClient;
}());
exports.BeaconClient = BeaconClient;
//# sourceMappingURL=BeaconClient.js.map