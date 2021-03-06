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
exports.MatrixClientStore = void 0;
var utils_1 = require("../utils/utils");
var MatrixRoom_1 = require("./models/MatrixRoom");
var __1 = require("..");
var PRESERVED_FIELDS = ['syncToken', 'rooms'];
/**
 * The class managing the local state of matrix
 */
var MatrixClientStore = /** @class */ (function () {
    function MatrixClientStore(storage) {
        var _this = this;
        this.storage = storage;
        /**
         * The state of the matrix client
         */
        this.state = {
            isRunning: false,
            userId: undefined,
            deviceId: undefined,
            txnNo: 0,
            accessToken: undefined,
            syncToken: undefined,
            pollingTimeout: undefined,
            pollingRetries: 0,
            rooms: {}
        };
        /**
         * Listeners that will be called when the state changes
         */
        this.onStateChangedListeners = new Map();
        /**
         * A promise that resolves once the client is ready
         */
        this.waitReadyPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.initFromStorage()];
                    case 1:
                        _a.sent();
                        resolve();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    /**
     * Get an item from the state
     *
     * @param key
     */
    MatrixClientStore.prototype.get = function (key) {
        return this.state[key];
    };
    /**
     * Get the room from an ID or room instance
     *
     * @param roomOrId
     */
    MatrixClientStore.prototype.getRoom = function (roomOrId) {
        var room = MatrixRoom_1.MatrixRoom.from(roomOrId, MatrixRoom_1.MatrixRoomStatus.UNKNOWN);
        return this.state.rooms[room.id] || room;
    };
    /**
     * Update the state with a partial state
     *
     * @param stateUpdate
     */
    MatrixClientStore.prototype.update = function (stateUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var oldState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitReady()];
                    case 1:
                        _a.sent();
                        oldState = Object.assign({}, this.state);
                        this.setState(stateUpdate);
                        this.updateStorage(stateUpdate);
                        this.notifyListeners(oldState, this.state, stateUpdate);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Register listeners that are called once the state has changed
     *
     * @param listener
     * @param subscribed
     */
    MatrixClientStore.prototype.onStateChanged = function (listener) {
        var _this = this;
        var subscribed = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subscribed[_i - 1] = arguments[_i];
        }
        if (subscribed.length > 0) {
            subscribed.forEach(function (key) {
                _this.onStateChangedListeners.set(key, listener);
            });
        }
        else {
            this.onStateChangedListeners.set('all', listener);
        }
    };
    /**
     * A promise that resolves once the client is ready
     */
    MatrixClientStore.prototype.waitReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.waitReadyPromise];
            });
        });
    };
    /**
     * Read state from storage
     */
    MatrixClientStore.prototype.initFromStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var preserved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(__1.StorageKey.MATRIX_PRESERVED_STATE)];
                    case 1:
                        preserved = _a.sent();
                        this.setState(preserved);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Prepare data before persisting it in storage
     *
     * @param toStore
     */
    MatrixClientStore.prototype.prepareData = function (toStore) {
        var requiresPreparation = ['rooms'];
        var toStoreCopy = requiresPreparation.some(function (key) { return toStore[key] !== undefined; })
            ? JSON.parse(JSON.stringify(toStore))
            : toStore;
        // there is no need for saving messages in a persistent storage
        Object.values(toStoreCopy.rooms || {}).forEach(function (room) {
            room.messages = [];
        });
        return toStoreCopy;
    };
    /**
     * Persist state in storage
     *
     * @param stateUpdate
     */
    MatrixClientStore.prototype.updateStorage = function (stateUpdate) {
        var _this = this;
        var updatedCachedFields = Object.entries(stateUpdate).filter(function (_a) {
            var key = _a[0], value = _a[1];
            return PRESERVED_FIELDS.includes(key) && Boolean(value);
        });
        if (updatedCachedFields.length > 0) {
            var filteredState_1 = {};
            PRESERVED_FIELDS.forEach(function (key) {
                filteredState_1[key] = _this.state[key];
            });
            this.storage.set(__1.StorageKey.MATRIX_PRESERVED_STATE, this.prepareData(filteredState_1));
        }
    };
    /**
     * Set the state
     *
     * @param partialState
     */
    MatrixClientStore.prototype.setState = function (partialState) {
        this.state = {
            isRunning: partialState.isRunning || this.state.isRunning,
            userId: partialState.userId || this.state.userId,
            deviceId: partialState.deviceId || this.state.deviceId,
            txnNo: partialState.txnNo || this.state.txnNo,
            accessToken: partialState.accessToken || this.state.accessToken,
            syncToken: partialState.syncToken || this.state.syncToken,
            pollingTimeout: partialState.pollingTimeout || this.state.pollingTimeout,
            pollingRetries: partialState.pollingRetries || this.state.pollingRetries,
            rooms: this.mergeRooms(this.state.rooms, partialState.rooms)
        };
    };
    /**
     * Merge room records and eliminate duplicates
     *
     * @param oldRooms
     * @param _newRooms
     */
    MatrixClientStore.prototype.mergeRooms = function (oldRooms, _newRooms) {
        if (!_newRooms) {
            return oldRooms;
        }
        var newRooms = Array.isArray(_newRooms) ? _newRooms : Object.values(_newRooms);
        var merged = Object.assign({}, oldRooms);
        newRooms.forEach(function (newRoom) {
            merged[newRoom.id] = MatrixRoom_1.MatrixRoom.merge(newRoom, oldRooms[newRoom.id]);
        });
        return merged;
    };
    /**
     * Notify listeners of state changes
     *
     * @param oldState
     * @param newState
     * @param stateChange
     */
    MatrixClientStore.prototype.notifyListeners = function (oldState, newState, stateChange) {
        var _this = this;
        var listenForAll = this.onStateChangedListeners.get('all');
        if (listenForAll) {
            listenForAll(oldState, newState, stateChange);
        }
        utils_1.keys(stateChange)
            .filter(function (key) { return stateChange[key] !== undefined; })
            .forEach(function (key) {
            var listener = _this.onStateChangedListeners.get(key);
            if (listener) {
                listener(oldState, newState, stateChange);
            }
        });
    };
    return MatrixClientStore;
}());
exports.MatrixClientStore = MatrixClientStore;
//# sourceMappingURL=MatrixClientStore.js.map