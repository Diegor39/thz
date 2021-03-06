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
exports.P2PTransport = void 0;
var Logger_1 = require("../utils/Logger");
var __1 = require("..");
var PeerManager_1 = require("../managers/PeerManager");
var logger = new Logger_1.Logger('P2PTransport');
/**
 * @internalapi
 *
 *
 */
var P2PTransport = /** @class */ (function (_super) {
    __extends(P2PTransport, _super);
    function P2PTransport(name, keyPair, storage, matrixNodes, storageKey, iconUrl, appUrl) {
        var _this = _super.call(this, name, new __1.P2PCommunicationClient(name, keyPair, 1, storage, matrixNodes, iconUrl, appUrl), new PeerManager_1.PeerManager(storage, storageKey)) || this;
        _this.type = __1.TransportType.P2P;
        return _this;
    }
    P2PTransport.isAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve(true)];
            });
        });
    };
    P2PTransport.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var knownPeers, connectionPromises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isConnected !== __1.TransportStatus.NOT_CONNECTED) {
                            return [2 /*return*/];
                        }
                        logger.log('connect');
                        this._isConnected = __1.TransportStatus.CONNECTING;
                        return [4 /*yield*/, this.client.start()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getPeers()];
                    case 2:
                        knownPeers = _a.sent();
                        if (knownPeers.length > 0) {
                            logger.log('connect', "connecting to " + knownPeers.length + " peers");
                            connectionPromises = knownPeers.map(function (peer) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, this.listen(peer.publicKey)];
                            }); }); });
                            Promise.all(connectionPromises).catch(function (error) { return logger.error('connect', error); });
                        }
                        return [4 /*yield*/, this.startOpenChannelListener()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, _super.prototype.connect.call(this)];
                }
            });
        });
    };
    P2PTransport.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.stop()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, _super.prototype.disconnect.call(this)];
                }
            });
        });
    };
    P2PTransport.prototype.startOpenChannelListener = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    P2PTransport.prototype.getPairingRequestInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.getPairingRequestInfo()];
            });
        });
    };
    P2PTransport.prototype.listen = function (publicKey) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client
                            .listenForEncryptedMessage(publicKey, function (message) {
                            var connectionContext = {
                                origin: __1.Origin.P2P,
                                id: publicKey
                            };
                            _this.notifyListeners(message, connectionContext).catch(function (error) {
                                throw error;
                            });
                        })
                            .catch(function (error) {
                            throw error;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return P2PTransport;
}(__1.Transport));
exports.P2PTransport = P2PTransport;
//# sourceMappingURL=P2PTransport.js.map