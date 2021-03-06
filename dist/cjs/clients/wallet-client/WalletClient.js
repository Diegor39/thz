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
exports.WalletClient = void 0;
var __1 = require("../..");
var PermissionManager_1 = require("../../managers/PermissionManager");
var AppMetadataManager_1 = require("../../managers/AppMetadataManager");
var IncomingRequestInterceptor_1 = require("../../interceptors/IncomingRequestInterceptor");
var OutgoingResponseInterceptor_1 = require("../../interceptors/OutgoingResponseInterceptor");
var BeaconMessageType_1 = require("../../types/beacon/BeaconMessageType");
var get_sender_id_1 = require("../../utils/get-sender-id");
var exposed_promise_1 = require("../../utils/exposed-promise");
var Logger_1 = require("../../utils/Logger");
var logger = new Logger_1.Logger('WalletClient');
/**
 * @publicapi
 *
 * The WalletClient has to be used in the wallet. It handles all the logic related to connecting to beacon-compatible
 * dapps and handling/responding to requests.
 *
 * @category Wallet
 */
var WalletClient = /** @class */ (function (_super) {
    __extends(WalletClient, _super);
    function WalletClient(config) {
        var _this = _super.call(this, __assign({ storage: new __1.LocalStorage() }, config)) || this;
        /**
         * Returns whether or not the transport is connected
         */
        _this._isConnected = new exposed_promise_1.ExposedPromise();
        /**
         * This array stores pending requests, meaning requests we received and have not yet handled / sent a response.
         */
        _this.pendingRequests = [];
        _this.permissionManager = new PermissionManager_1.PermissionManager(new __1.LocalStorage());
        _this.appMetadataManager = new AppMetadataManager_1.AppMetadataManager(new __1.LocalStorage());
        return _this;
    }
    Object.defineProperty(WalletClient.prototype, "isConnected", {
        get: function () {
            return this._isConnected.promise;
        },
        enumerable: false,
        configurable: true
    });
    WalletClient.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var keyPair, p2pTransport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.keyPair]; // We wait for keypair here so the P2P Transport creation is not delayed and causing issues
                    case 1:
                        keyPair = _a.sent() // We wait for keypair here so the P2P Transport creation is not delayed and causing issues
                        ;
                        p2pTransport = new __1.WalletP2PTransport(this.name, keyPair, this.storage, this.matrixNodes, this.iconUrl, this.appUrl);
                        return [2 /*return*/, _super.prototype.init.call(this, p2pTransport)];
                }
            });
        });
    };
    /**
     * This method initiates a connection to the P2P network and registers a callback that will be called
     * whenever a message is received.
     *
     * @param newMessageCallback The callback that will be invoked for every message the transport receives.
     */
    WalletClient.prototype.connect = function (newMessageCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.handleResponse = function (message, connectionContext) { return __awaiter(_this, void 0, void 0, function () {
                    var transport, peers, peer;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(message.type === BeaconMessageType_1.BeaconMessageType.Disconnect)) return [3 /*break*/, 5];
                                return [4 /*yield*/, this.transport];
                            case 1:
                                transport = _a.sent();
                                return [4 /*yield*/, transport.getPeers()];
                            case 2:
                                peers = _a.sent();
                                peer = peers.find(function (peerEl) { return peerEl.senderId === message.senderId; });
                                if (!peer) return [3 /*break*/, 4];
                                return [4 /*yield*/, this.removePeer(peer)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                            case 5:
                                if (!!this.pendingRequests.some(function (request) { return request[0].id === message.id; })) return [3 /*break*/, 9];
                                this.pendingRequests.push([message, connectionContext]);
                                if (!(message.version !== '1')) return [3 /*break*/, 7];
                                return [4 /*yield*/, this.sendAcknowledgeResponse(message, connectionContext)];
                            case 6:
                                _a.sent();
                                _a.label = 7;
                            case 7: return [4 /*yield*/, IncomingRequestInterceptor_1.IncomingRequestInterceptor.intercept({
                                    message: message,
                                    connectionInfo: connectionContext,
                                    appMetadataManager: this.appMetadataManager,
                                    interceptorCallback: newMessageCallback
                                })];
                            case 8:
                                _a.sent();
                                _a.label = 9;
                            case 9: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, this._connect()];
            });
        });
    };
    /**
     * The method will attempt to initiate a connection using the active transport.
     */
    WalletClient.prototype._connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport];
                    case 1:
                        transport = (_a.sent());
                        if (!(transport.connectionStatus === __1.TransportStatus.NOT_CONNECTED)) return [3 /*break*/, 3];
                        return [4 /*yield*/, transport.connect()];
                    case 2:
                        _a.sent();
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
                            .catch(function (error) { return logger.log('_connect', error); });
                        this._isConnected.resolve(true);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method sends a response for a specific request back to the DApp
     *
     * @param message The BeaconResponseMessage that will be sent back to the DApp
     */
    WalletClient.prototype.respond = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var request, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        request = this.pendingRequests.find(function (pendingRequest) { return pendingRequest[0].id === message.id; });
                        if (!request) {
                            throw new Error('No matching request found!');
                        }
                        this.pendingRequests = this.pendingRequests.filter(function (pendingRequest) { return pendingRequest[0].id !== message.id; });
                        _b = (_a = OutgoingResponseInterceptor_1.OutgoingResponseInterceptor).intercept;
                        _c = {};
                        _d = get_sender_id_1.getSenderId;
                        return [4 /*yield*/, this.beaconId];
                    case 1: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
                    case 2:
                        _c.senderId = _e.sent(),
                            _c.request = request[0],
                            _c.message = message;
                        return [4 /*yield*/, this.getOwnAppMetadata()];
                    case 3: return [4 /*yield*/, _b.apply(_a, [(_c.ownAppMetadata = _e.sent(),
                                _c.permissionManager = this.permissionManager,
                                _c.appMetadataManager = this.appMetadataManager,
                                _c.interceptorCallback = function (response) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.respondToMessage(response, request[1])];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                _c)])];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WalletClient.prototype.getAppMetadataList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.appMetadataManager.getAppMetadataList()];
            });
        });
    };
    WalletClient.prototype.getAppMetadata = function (senderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.appMetadataManager.getAppMetadata(senderId)];
            });
        });
    };
    WalletClient.prototype.removeAppMetadata = function (senderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.appMetadataManager.removeAppMetadata(senderId)];
            });
        });
    };
    WalletClient.prototype.removeAllAppMetadata = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.appMetadataManager.removeAllAppMetadata()];
            });
        });
    };
    WalletClient.prototype.getPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.permissionManager.getPermissions()];
            });
        });
    };
    WalletClient.prototype.getPermission = function (accountIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.permissionManager.getPermission(accountIdentifier)];
            });
        });
    };
    WalletClient.prototype.removePermission = function (accountIdentifier) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.permissionManager.removePermission(accountIdentifier)];
            });
        });
    };
    WalletClient.prototype.removeAllPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.permissionManager.removeAllPermissions()];
            });
        });
    };
    /**
     * Add a new peer to the known peers
     * @param peer The new peer to add
     */
    WalletClient.prototype.addPeer = function (peer, sendPairingResponse) {
        if (sendPairingResponse === void 0) { sendPairingResponse = true; }
        return __awaiter(this, void 0, void 0, function () {
            var extendedPeer, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [__assign({}, peer)];
                        _b = {};
                        return [4 /*yield*/, get_sender_id_1.getSenderId(peer.publicKey)];
                    case 1:
                        extendedPeer = __assign.apply(void 0, _a.concat([(_b.senderId = _c.sent(), _b)]));
                        return [4 /*yield*/, this.transport];
                    case 2: return [2 /*return*/, (_c.sent()).addPeer(extendedPeer, sendPairingResponse)];
                }
            });
        });
    };
    WalletClient.prototype.removePeer = function (peer, sendDisconnectToPeer) {
        if (sendDisconnectToPeer === void 0) { sendDisconnectToPeer = false; }
        return __awaiter(this, void 0, void 0, function () {
            var removePeerResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport];
                    case 1:
                        removePeerResult = (_a.sent()).removePeer(peer);
                        return [4 /*yield*/, this.removePermissionsForPeers([peer])];
                    case 2:
                        _a.sent();
                        if (!sendDisconnectToPeer) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sendDisconnectToPeer(peer)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, removePeerResult];
                }
            });
        });
    };
    WalletClient.prototype.removeAllPeers = function (sendDisconnectToPeers) {
        if (sendDisconnectToPeers === void 0) { sendDisconnectToPeers = false; }
        return __awaiter(this, void 0, void 0, function () {
            var peers, removePeerResult, disconnectPromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transport];
                    case 1: return [4 /*yield*/, (_a.sent()).getPeers()];
                    case 2:
                        peers = _a.sent();
                        return [4 /*yield*/, this.transport];
                    case 3:
                        removePeerResult = (_a.sent()).removeAllPeers();
                        return [4 /*yield*/, this.removePermissionsForPeers(peers)];
                    case 4:
                        _a.sent();
                        if (!sendDisconnectToPeers) return [3 /*break*/, 6];
                        disconnectPromises = peers.map(function (peer) { return _this.sendDisconnectToPeer(peer); });
                        return [4 /*yield*/, Promise.all(disconnectPromises)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, removePeerResult];
                }
            });
        });
    };
    WalletClient.prototype.removePermissionsForPeers = function (peersToRemove) {
        return __awaiter(this, void 0, void 0, function () {
            var permissions, peerIdsToRemove, permissionsToRemove, permissionIdentifiersToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.permissionManager.getPermissions()];
                    case 1:
                        permissions = _a.sent();
                        peerIdsToRemove = peersToRemove.map(function (peer) { return peer.senderId; });
                        permissionsToRemove = permissions.filter(function (permission) {
                            return peerIdsToRemove.includes(permission.appMetadata.senderId);
                        });
                        permissionIdentifiersToRemove = permissionsToRemove.map(function (permissionInfo) { return permissionInfo.accountIdentifier; });
                        return [4 /*yield*/, this.permissionManager.removePermissions(permissionIdentifiersToRemove)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send an acknowledge message back to the sender
     *
     * @param message The message that was received
     */
    WalletClient.prototype.sendAcknowledgeResponse = function (request, connectionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var acknowledgeResponse, _a, _b, _c, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        acknowledgeResponse = {
                            id: request.id,
                            type: BeaconMessageType_1.BeaconMessageType.Acknowledge
                        };
                        _b = (_a = OutgoingResponseInterceptor_1.OutgoingResponseInterceptor).intercept;
                        _c = {};
                        _d = get_sender_id_1.getSenderId;
                        return [4 /*yield*/, this.beaconId];
                    case 1: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
                    case 2:
                        _c.senderId = _e.sent(),
                            _c.request = request,
                            _c.message = acknowledgeResponse;
                        return [4 /*yield*/, this.getOwnAppMetadata()];
                    case 3: return [4 /*yield*/, _b.apply(_a, [(_c.ownAppMetadata = _e.sent(),
                                _c.permissionManager = this.permissionManager,
                                _c.appMetadataManager = this.appMetadataManager,
                                _c.interceptorCallback = function (response) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.respondToMessage(response, connectionContext)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                _c)])];
                    case 4:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * An internal method to send a BeaconMessage to the DApp
     *
     * @param response Send a message back to the DApp
     */
    WalletClient.prototype.respondToMessage = function (response, connectionContext) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedMessage, peerInfos, peer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new __1.Serializer().serialize(response)];
                    case 1:
                        serializedMessage = _a.sent();
                        if (!connectionContext) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getPeers()];
                    case 2:
                        peerInfos = _a.sent();
                        peer = peerInfos.find(function (peerInfo) { return peerInfo.publicKey === connectionContext.id; });
                        return [4 /*yield*/, this.transport];
                    case 3: return [4 /*yield*/, (_a.sent()).send(serializedMessage, peer)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, this.transport];
                    case 6: return [4 /*yield*/, (_a.sent()).send(serializedMessage)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return WalletClient;
}(__1.Client));
exports.WalletClient = WalletClient;
//# sourceMappingURL=WalletClient.js.map