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
exports.Client = void 0;
var exposed_promise_1 = require("../../utils/exposed-promise");
var __1 = require("../..");
var events_1 = require("../../events");
var BeaconClient_1 = require("../beacon-client/BeaconClient");
var AccountManager_1 = require("../../managers/AccountManager");
var generate_uuid_1 = require("../../utils/generate-uuid");
var constants_1 = require("../../constants");
var get_sender_id_1 = require("../../utils/get-sender-id");
var Logger_1 = require("../../utils/Logger");
var logger = new Logger_1.Logger('Client');
/**
 * @internalapi
 *
 * This abstract class handles the a big part of the logic that is shared between the dapp and wallet client.
 * For example, it selects and manages the transport and accounts.
 */
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(config) {
        var _a, _b;
        var _this = _super.call(this, config) || this;
        /**
         * How many requests can be sent after another
         */
        _this.rateLimit = 2;
        /**
         * The time window in seconds in which the "rateLimit" is checked
         */
        _this.rateLimitWindowInSeconds = 5;
        /**
         * Stores the times when requests have been made to determine if the rate limit has been reached
         */
        _this.requestCounter = [];
        _this._transport = new exposed_promise_1.ExposedPromise();
        _this.events = new events_1.BeaconEventHandler(config.eventHandlers, (_a = config.disableDefaultEvents) !== null && _a !== void 0 ? _a : false);
        _this.accountManager = new AccountManager_1.AccountManager(config.storage);
        _this.matrixNodes = (_b = config.matrixNodes) !== null && _b !== void 0 ? _b : [];
        _this.handleResponse = function (message, connectionInfo) {
            throw new Error("not overwritten" + JSON.stringify(message) + " - " + JSON.stringify(connectionInfo));
        };
        return _this;
    }
    Object.defineProperty(Client.prototype, "transport", {
        get: function () {
            return this._transport.promise;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "connectionStatus", {
        /**
         * Returns the connection status of the Client
         */
        get: function () {
            var _a, _b;
            return (_b = (_a = this._transport.promiseResult) === null || _a === void 0 ? void 0 : _a.connectionStatus) !== null && _b !== void 0 ? _b : __1.TransportStatus.NOT_CONNECTED;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "ready", {
        /**
         * Returns whether or not the transaport is ready
         */
        get: function () {
            return this.transport.then(function () { return undefined; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return all locally known accounts
     */
    Client.prototype.getAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountManager.getAccounts()];
            });
        });
    };
    /**
     * Return the account by ID
     * @param accountIdentifier The ID of an account
     */
    Client.prototype.getAccount = function (accountIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountManager.getAccount(accountIdentifier)];
            });
        });
    };
    /**
     * Remove the account by ID
     * @param accountIdentifier The ID of an account
     */
    Client.prototype.removeAccount = function (accountIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountManager.removeAccount(accountIdentifier)];
            });
        });
    };
    /**
     * Remove all locally stored accounts
     */
    Client.prototype.removeAllAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountManager.removeAllAccounts()];
            });
        });
    };
    /**
     * Add a new request (current timestamp) to the pending requests, remove old ones and check if we are above the limit
     */
    Client.prototype.addRequestAndCheckIfRateLimited = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            var _this = this;
            return __generator(this, function (_a) {
                now = new Date().getTime();
                this.requestCounter = this.requestCounter.filter(function (date) { return date + _this.rateLimitWindowInSeconds * 1000 > now; });
                this.requestCounter.push(now);
                return [2 /*return*/, this.requestCounter.length > this.rateLimit];
            });
        });
    };
    /**
     * This method initializes the client. It will check if the connection should be established to a
     * browser extension or if the P2P transport should be used.
     *
     * @param transport A transport that can be provided by the user
     */
    Client.prototype.init = function (transport) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._transport.status === exposed_promise_1.ExposedPromiseStatus.RESOLVED)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.transport];
                    case 1: return [2 /*return*/, (_a.sent()).type];
                    case 2: return [4 /*yield*/, this.setTransport(transport)]; // Let users define their own transport
                    case 3:
                        _a.sent(); // Let users define their own transport
                        return [2 /*return*/, transport.type];
                }
            });
        });
    };
    /**
     * Returns the metadata of this DApp
     */
    Client.prototype.getOwnAppMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = {};
                        _b = get_sender_id_1.getSenderId;
                        return [4 /*yield*/, this.beaconId];
                    case 1: return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
                    case 2: return [2 /*return*/, (_a.senderId = _c.sent(),
                            _a.name = this.name,
                            _a.icon = this.iconUrl,
                            _a)];
                }
            });
        });
    };
    /**
     * Return all known peers
     */
    Client.prototype.getPeers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport];
                    case 1: return [2 /*return*/, (_a.sent()).getPeers()];
                }
            });
        });
    };
    /**
     * Add a new peer to the known peers
     * @param peer The new peer to add
     */
    Client.prototype.addPeer = function (peer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport];
                    case 1: return [2 /*return*/, (_a.sent()).addPeer(peer)];
                }
            });
        });
    };
    Client.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._transport.status === exposed_promise_1.ExposedPromiseStatus.RESOLVED)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.transport];
                    case 1: return [4 /*yield*/, (_a.sent()).disconnect()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, _super.prototype.destroy.call(this)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A "setter" for when the transport needs to be changed.
     */
    Client.prototype.setTransport = function (transport) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (transport) {
                            if (this._transport.isSettled()) {
                                // If the promise has already been resolved we need to create a new one.
                                this._transport = exposed_promise_1.ExposedPromise.resolve(transport);
                            }
                            else {
                                this._transport.resolve(transport);
                            }
                        }
                        else {
                            if (this._transport.isSettled()) {
                                // If the promise has already been resolved we need to create a new one.
                                this._transport = new exposed_promise_1.ExposedPromise();
                            }
                        }
                        return [4 /*yield*/, this.events.emit(events_1.BeaconEvent.ACTIVE_TRANSPORT_SET, transport)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.addListener = function (transport) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                transport
                    .addListener(function (message, connectionInfo) { return __awaiter(_this, void 0, void 0, function () {
                    var deserializedMessage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(typeof message === 'string')) return [3 /*break*/, 2];
                                return [4 /*yield*/, new __1.Serializer().deserialize(message)];
                            case 1:
                                deserializedMessage = (_a.sent());
                                this.handleResponse(deserializedMessage, connectionInfo);
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (error) { return logger.error('addListener', error); });
                return [2 /*return*/];
            });
        });
    };
    Client.prototype.sendDisconnectToPeer = function (peer, transport) {
        return __awaiter(this, void 0, void 0, function () {
            var request, _a, _b, payload, selectedTransport, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = {};
                        return [4 /*yield*/, generate_uuid_1.generateGUID()];
                    case 1:
                        _a.id = _d.sent(),
                            _a.version = constants_1.BEACON_VERSION;
                        _b = get_sender_id_1.getSenderId;
                        return [4 /*yield*/, this.beaconId];
                    case 2: return [4 /*yield*/, _b.apply(void 0, [_d.sent()])];
                    case 3:
                        request = (_a.senderId = _d.sent(),
                            _a.type = __1.BeaconMessageType.Disconnect,
                            _a);
                        return [4 /*yield*/, new __1.Serializer().serialize(request)];
                    case 4:
                        payload = _d.sent();
                        if (!(transport !== null && transport !== void 0)) return [3 /*break*/, 5];
                        _c = transport;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.transport];
                    case 6:
                        _c = (_d.sent());
                        _d.label = 7;
                    case 7:
                        selectedTransport = _c;
                        return [4 /*yield*/, selectedTransport.send(payload, peer)];
                    case 8:
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}(BeaconClient_1.BeaconClient));
exports.Client = Client;
//# sourceMappingURL=Client.js.map