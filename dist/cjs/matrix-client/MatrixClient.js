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
exports.MatrixClient = void 0;
var Logger_1 = require("../utils/Logger");
var exposed_promise_1 = require("../utils/exposed-promise");
var MatrixClientStore_1 = require("./MatrixClientStore");
var MatrixHttpClient_1 = require("./MatrixHttpClient");
var MatrixRoom_1 = require("./models/MatrixRoom");
var MatrixRoomService_1 = require("./services/MatrixRoomService");
var MatrixUserService_1 = require("./services/MatrixUserService");
var MatrixEventService_1 = require("./services/MatrixEventService");
var MatrixClientEventEmitter_1 = require("./MatrixClientEventEmitter");
var logger = new Logger_1.Logger('MatrixClient');
var IMMEDIATE_POLLING_RETRIES = 3;
var RETRY_INTERVAL = 5000;
/**
 * The matrix client used to connect to the matrix network
 */
var MatrixClient = /** @class */ (function () {
    function MatrixClient(store, eventEmitter, userService, roomService, eventService, httpClient) {
        var _this = this;
        this.store = store;
        this.eventEmitter = eventEmitter;
        this.userService = userService;
        this.roomService = roomService;
        this.eventService = eventService;
        this.httpClient = httpClient;
        this.isActive = true;
        this._isReady = new exposed_promise_1.ExposedPromise();
        this.store.onStateChanged(function (oldState, newState, stateChange) {
            _this.eventEmitter.onStateChanged(oldState, newState, stateChange);
        }, 'rooms');
    }
    /**
     * Create a matrix client based on the options provided
     *
     * @param config
     */
    MatrixClient.create = function (config) {
        var store = new MatrixClientStore_1.MatrixClientStore(config.storage);
        var eventEmitter = new MatrixClientEventEmitter_1.MatrixClientEventEmitter();
        var httpClient = new MatrixHttpClient_1.MatrixHttpClient(config.baseUrl);
        var accountService = new MatrixUserService_1.MatrixUserService(httpClient);
        var roomService = new MatrixRoomService_1.MatrixRoomService(httpClient);
        var eventService = new MatrixEventService_1.MatrixEventService(httpClient);
        return new MatrixClient(store, eventEmitter, accountService, roomService, eventService, httpClient);
    };
    Object.defineProperty(MatrixClient.prototype, "joinedRooms", {
        /**
         * Return all the rooms we are currently part of
         */
        get: function () {
            var _this = this;
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.isConnected()];
                        case 1:
                            _a.sent();
                            resolve(Object.values(this.store.get('rooms')).filter(function (room) { return room.status === MatrixRoom_1.MatrixRoomStatus.JOINED; }));
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MatrixClient.prototype, "invitedRooms", {
        /**
         * Return all the rooms to which we have received invitations
         */
        get: function () {
            var _this = this;
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.isConnected()];
                        case 1:
                            _a.sent();
                            resolve(Object.values(this.store.get('rooms')).filter(function (room) { return room.status === MatrixRoom_1.MatrixRoomStatus.INVITED; }));
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MatrixClient.prototype, "leftRooms", {
        /**
         * Return all the rooms that we left
         */
        get: function () {
            var _this = this;
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.isConnected()];
                        case 1:
                            _a.sent();
                            resolve(Object.values(this.store.get('rooms')).filter(function (room) { return room.status === MatrixRoom_1.MatrixRoomStatus.LEFT; }));
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initiate the connection to the matrix node and log in
     *
     * @param user
     */
    MatrixClient.prototype.start = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var response, initialPollingResult;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.login(user.id, user.password, user.deviceId)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, this.store.update({
                                accessToken: response.access_token
                            })];
                    case 2:
                        _a.sent();
                        initialPollingResult = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.poll(0, function (pollingResponse) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!this.store.get('isRunning')) {
                                                            resolve();
                                                        }
                                                        return [4 /*yield*/, this.store.update({
                                                                isRunning: true,
                                                                syncToken: pollingResponse.next_batch,
                                                                pollingTimeout: 30000,
                                                                pollingRetries: 0,
                                                                rooms: MatrixRoom_1.MatrixRoom.fromSync(pollingResponse.rooms)
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, function (error) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!this.store.get('isRunning')) {
                                                            reject(error);
                                                        }
                                                        return [4 /*yield*/, this.store.update({
                                                                isRunning: false,
                                                                pollingRetries: this.store.get('pollingRetries') + 1
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        initialPollingResult
                            .then(function () {
                            _this._isReady.resolve();
                        })
                            .catch(console.error);
                        return [2 /*return*/, initialPollingResult];
                }
            });
        });
    };
    MatrixClient.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._isReady.promise];
            });
        });
    };
    /**
     * Stop all running requests
     */
    MatrixClient.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.log("MATRIX CLIENT STOPPED");
                this.isActive = false;
                this._isReady = new exposed_promise_1.ExposedPromise();
                return [2 /*return*/, this.httpClient.cancelAllRequests()];
            });
        });
    };
    /**
     * Subscribe to new matrix events
     *
     * @param event
     * @param listener
     */
    MatrixClient.prototype.subscribe = function (event, listener) {
        this.eventEmitter.on(event, listener);
    };
    /**
     * Unsubscribe from matrix events
     *
     * @param event
     * @param listener
     */
    MatrixClient.prototype.unsubscribe = function (event, listener) {
        if (listener) {
            this.eventEmitter.removeListener(event, listener);
        }
    };
    /**
     * Unsubscribe from all matrix events of this type
     *
     * @param event
     * @param listener
     */
    MatrixClient.prototype.unsubscribeAll = function (event) {
        this.eventEmitter.removeAllListeners(event);
    };
    MatrixClient.prototype.getRoomById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.store.getRoom(id)];
                }
            });
        });
    };
    /**
     * Create a private room with the supplied members
     *
     * @param members Members that will be in the room
     */
    MatrixClient.prototype.createTrustedPrivateRoom = function () {
        var members = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            members[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.requiresAuthorization('createRoom', function (accessToken) { return __awaiter(_this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.roomService.createRoom(accessToken, {
                                                room_version: '5',
                                                invite: members,
                                                preset: 'public_chat',
                                                is_direct: true
                                            })];
                                        case 1:
                                            response = _a.sent();
                                            return [2 /*return*/, response.room_id];
                                    }
                                });
                            }); })];
                }
            });
        });
    };
    /**
     * Invite user to rooms
     *
     * @param user The user to be invited
     * @param roomsOrIds The rooms the user will be invited to
     */
    MatrixClient.prototype.inviteToRooms = function (user) {
        var roomsOrIds = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            roomsOrIds[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.requiresAuthorization('invite', function (accessToken) {
                                return Promise.all(roomsOrIds.map(function (roomOrId) {
                                    var room = _this.store.getRoom(roomOrId);
                                    _this.roomService
                                        .inviteToRoom(accessToken, user, room)
                                        .catch(function (error) { return logger.warn('inviteToRooms', error); });
                                }));
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Join rooms
     *
     * @param roomsOrIds
     */
    MatrixClient.prototype.joinRooms = function () {
        var roomsOrIds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            roomsOrIds[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.requiresAuthorization('join', function (accessToken) {
                                return Promise.all(roomsOrIds.map(function (roomOrId) {
                                    var room = _this.store.getRoom(roomOrId);
                                    return _this.roomService.joinRoom(accessToken, room);
                                }));
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send a text message
     *
     * @param roomOrId
     * @param message
     */
    MatrixClient.prototype.sendTextMessage = function (roomId, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isConnected()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.requiresAuthorization('send', function (accessToken) { return __awaiter(_this, void 0, void 0, function () {
                                var txnId;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.createTxnId()];
                                        case 1:
                                            txnId = _a.sent();
                                            return [2 /*return*/, this.eventService.sendMessage(accessToken, roomId, {
                                                    msgtype: 'm.text',
                                                    body: message
                                                }, txnId)];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Poll the server to get the latest data and get notified of changes
     *
     * @param interval
     * @param onSyncSuccess
     * @param onSyncError
     */
    MatrixClient.prototype.poll = function (interval, onSyncSuccess, onSyncError) {
        return __awaiter(this, void 0, void 0, function () {
            var store, sync, pollSync;
            var _this = this;
            return __generator(this, function (_a) {
                store = this.store;
                sync = this.sync.bind(this);
                pollSync = function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var syncingRetries, response, error_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                syncingRetries = 0;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, 4, 5]);
                                return [4 /*yield*/, sync()];
                            case 2:
                                response = _a.sent();
                                onSyncSuccess(response);
                                return [3 /*break*/, 5];
                            case 3:
                                error_1 = _a.sent();
                                onSyncError(error_1);
                                syncingRetries = store.get('pollingRetries');
                                // console.warn('Could not sync:', error)
                                if (this.isActive) {
                                    logger.log("Retry syncing... " + syncingRetries + " retries so far");
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                if (this.isActive) {
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, pollSync(resolve, reject)];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, syncingRetries > IMMEDIATE_POLLING_RETRIES ? RETRY_INTERVAL + interval : interval);
                                }
                                else {
                                    reject(new Error("Syncing stopped manually."));
                                }
                                return [7 /*endfinally*/];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, new Promise(pollSync)];
            });
        });
    };
    /**
     * Get state from server
     */
    MatrixClient.prototype.sync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requiresAuthorization('sync', function (accessToken) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, this.eventService.sync(accessToken, {
                                    pollingTimeout: this.store.get('pollingTimeout'),
                                    syncToken: this.store.get('syncToken')
                                })];
                        });
                    }); })];
            });
        });
    };
    /**
     * A helper method that makes sure an access token is provided
     *
     * @param name
     * @param action
     */
    MatrixClient.prototype.requiresAuthorization = function (name, action) {
        return __awaiter(this, void 0, void 0, function () {
            var storedToken;
            return __generator(this, function (_a) {
                storedToken = this.store.get('accessToken');
                if (!storedToken) {
                    return [2 /*return*/, Promise.reject(name + " requires authorization but no access token has been provided.")];
                }
                return [2 /*return*/, action(storedToken)];
            });
        });
    };
    /**
     * Create a transaction ID
     */
    MatrixClient.prototype.createTxnId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = new Date().getTime();
                        counter = this.store.get('txnNo');
                        return [4 /*yield*/, this.store.update({
                                txnNo: counter + 1
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "m" + timestamp + "." + counter];
                }
            });
        });
    };
    return MatrixClient;
}());
exports.MatrixClient = MatrixClient;
//# sourceMappingURL=MatrixClient.js.map