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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PostMessageClient = void 0;
var sodium = __importStar(require("libsodium-wrappers"));
var MockWindow_1 = require("../../MockWindow");
var __1 = require("../..");
var crypto_1 = require("../../utils/crypto");
var get_sender_id_1 = require("../../utils/get-sender-id");
var MessageBasedClient_1 = require("./MessageBasedClient");
/**
 * @internalapi
 *
 *
 */
var PostMessageClient = /** @class */ (function (_super) {
    __extends(PostMessageClient, _super);
    function PostMessageClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeListeners = new Map();
        return _this;
    }
    PostMessageClient.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscribeToMessages().catch(console.error);
                return [2 /*return*/];
            });
        });
    };
    PostMessageClient.prototype.listenForEncryptedMessage = function (senderPublicKey, messageCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var callbackFunction;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.activeListeners.has(senderPublicKey)) {
                    return [2 /*return*/];
                }
                callbackFunction = function (message, context) { return __awaiter(_this, void 0, void 0, function () {
                    var decryptedMessage, decryptionError_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, this.decryptMessage(senderPublicKey, message.encryptedPayload)
                                    // console.log('calculated sender ID', await getSenderId(senderPublicKey))
                                    // TODO: Add check for correct decryption key / sender ID
                                ];
                            case 1:
                                decryptedMessage = _a.sent();
                                // console.log('calculated sender ID', await getSenderId(senderPublicKey))
                                // TODO: Add check for correct decryption key / sender ID
                                messageCallback(decryptedMessage, context);
                                return [3 /*break*/, 3];
                            case 2:
                                decryptionError_1 = _a.sent();
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                this.activeListeners.set(senderPublicKey, callbackFunction);
                return [2 /*return*/];
            });
        });
    };
    PostMessageClient.prototype.sendMessage = function (message, peer) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var payload, targetId, msg;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.encryptMessage(peer.publicKey, message)];
                    case 1:
                        payload = _b.sent();
                        targetId = (_a = peer) === null || _a === void 0 ? void 0 : _a.extensionId;
                        msg = {
                            target: __1.ExtensionMessageTarget.EXTENSION,
                            encryptedPayload: payload,
                            targetId: targetId
                        };
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        MockWindow_1.windowRef.postMessage(msg, MockWindow_1.windowRef.location.origin);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostMessageClient.prototype.listenForChannelOpening = function (messageCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var fn;
            var _this = this;
            return __generator(this, function (_a) {
                fn = function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var data, _a, payload, pairingResponse, _b, _c, _d, _e, _f, decryptionError_2;
                    var _g, _h;
                    return __generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                data = (_g = event === null || event === void 0 ? void 0 : event.data) === null || _g === void 0 ? void 0 : _g.message;
                                _a = data &&
                                    data.target === __1.ExtensionMessageTarget.PAGE;
                                if (!_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.isChannelOpenMessage(data)];
                            case 1:
                                _a = (_j.sent());
                                _j.label = 2;
                            case 2:
                                if (!_a) return [3 /*break*/, 7];
                                payload = Buffer.from(data.payload, 'hex');
                                if (!(payload.length >=
                                    sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES)) return [3 /*break*/, 7];
                                _j.label = 3;
                            case 3:
                                _j.trys.push([3, 6, , 7]);
                                _c = (_b = JSON).parse;
                                return [4 /*yield*/, crypto_1.openCryptobox(payload, this.keyPair.publicKey, this.keyPair.privateKey)];
                            case 4:
                                pairingResponse = _c.apply(_b, [_j.sent()]);
                                _d = messageCallback;
                                _e = [__assign({}, pairingResponse)];
                                _f = {};
                                return [4 /*yield*/, get_sender_id_1.getSenderId(pairingResponse.publicKey)];
                            case 5:
                                _d.apply(void 0, [__assign.apply(void 0, _e.concat([(_f.senderId = _j.sent(), _f.extensionId = (_h = event === null || event === void 0 ? void 0 : event.data) === null || _h === void 0 ? void 0 : _h.sender.id, _f)]))]);
                                return [3 /*break*/, 7];
                            case 6:
                                decryptionError_2 = _j.sent();
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); };
                MockWindow_1.windowRef.addEventListener('message', fn);
                return [2 /*return*/];
            });
        });
    };
    PostMessageClient.prototype.sendPairingRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var message, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = {
                            target: __1.ExtensionMessageTarget.EXTENSION
                        };
                        _c = (_b = new __1.Serializer()).serialize;
                        return [4 /*yield*/, this.getPairingRequestInfo()];
                    case 1: return [4 /*yield*/, _c.apply(_b, [_d.sent()])];
                    case 2:
                        message = (_a.payload = _d.sent(),
                            _a.targetId = id,
                            _a);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        MockWindow_1.windowRef.postMessage(message, MockWindow_1.windowRef.location.origin);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostMessageClient.prototype.isChannelOpenMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, typeof message === 'object' && message.hasOwnProperty('payload')];
            });
        });
    };
    PostMessageClient.prototype.subscribeToMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                MockWindow_1.windowRef.addEventListener('message', function (message) {
                    if (typeof message === 'object' && message) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var data_1 = message.data;
                        if (data_1.message && data_1.message.target === __1.ExtensionMessageTarget.PAGE) {
                            _this.activeListeners.forEach(function (listener) {
                                listener(data_1.message, {
                                    origin: __1.Origin.EXTENSION,
                                    id: data_1.sender.id || ''
                                });
                            });
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return PostMessageClient;
}(MessageBasedClient_1.MessageBasedClient));
exports.PostMessageClient = PostMessageClient;
//# sourceMappingURL=PostMessageClient.js.map