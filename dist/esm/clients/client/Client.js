var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ExposedPromise, ExposedPromiseStatus } from '../../utils/exposed-promise';
import { Serializer, TransportStatus, BeaconMessageType } from '../..';
import { BeaconEventHandler, BeaconEvent } from '../../events';
import { BeaconClient } from '../beacon-client/BeaconClient';
import { AccountManager } from '../../managers/AccountManager';
import { generateGUID } from '../../utils/generate-uuid';
import { BEACON_VERSION } from '../../constants';
import { getSenderId } from '../../utils/get-sender-id';
import { Logger } from '../../utils/Logger';
const logger = new Logger('Client');
/**
 * @internalapi
 *
 * This abstract class handles the a big part of the logic that is shared between the dapp and wallet client.
 * For example, it selects and manages the transport and accounts.
 */
export class Client extends BeaconClient {
    constructor(config) {
        var _a, _b;
        super(config);
        /**
         * How many requests can be sent after another
         */
        this.rateLimit = 2;
        /**
         * The time window in seconds in which the "rateLimit" is checked
         */
        this.rateLimitWindowInSeconds = 5;
        /**
         * Stores the times when requests have been made to determine if the rate limit has been reached
         */
        this.requestCounter = [];
        this._transport = new ExposedPromise();
        this.events = new BeaconEventHandler(config.eventHandlers, (_a = config.disableDefaultEvents) !== null && _a !== void 0 ? _a : false);
        this.accountManager = new AccountManager(config.storage);
        this.matrixNodes = (_b = config.matrixNodes) !== null && _b !== void 0 ? _b : [];
        this.handleResponse = (message, connectionInfo) => {
            throw new Error(`not overwritten${JSON.stringify(message)} - ${JSON.stringify(connectionInfo)}`);
        };
    }
    get transport() {
        return this._transport.promise;
    }
    /**
     * Returns the connection status of the Client
     */
    get connectionStatus() {
        var _a, _b;
        return (_b = (_a = this._transport.promiseResult) === null || _a === void 0 ? void 0 : _a.connectionStatus) !== null && _b !== void 0 ? _b : TransportStatus.NOT_CONNECTED;
    }
    /**
     * Returns whether or not the transaport is ready
     */
    get ready() {
        return this.transport.then(() => undefined);
    }
    /**
     * Return all locally known accounts
     */
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.getAccounts();
        });
    }
    /**
     * Return the account by ID
     * @param accountIdentifier The ID of an account
     */
    getAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.getAccount(accountIdentifier);
        });
    }
    /**
     * Remove the account by ID
     * @param accountIdentifier The ID of an account
     */
    removeAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.removeAccount(accountIdentifier);
        });
    }
    /**
     * Remove all locally stored accounts
     */
    removeAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountManager.removeAllAccounts();
        });
    }
    /**
     * Add a new request (current timestamp) to the pending requests, remove old ones and check if we are above the limit
     */
    addRequestAndCheckIfRateLimited() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date().getTime();
            this.requestCounter = this.requestCounter.filter((date) => date + this.rateLimitWindowInSeconds * 1000 > now);
            this.requestCounter.push(now);
            return this.requestCounter.length > this.rateLimit;
        });
    }
    /**
     * This method initializes the client. It will check if the connection should be established to a
     * browser extension or if the P2P transport should be used.
     *
     * @param transport A transport that can be provided by the user
     */
    init(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._transport.status === ExposedPromiseStatus.RESOLVED) {
                return (yield this.transport).type;
            }
            yield this.setTransport(transport); // Let users define their own transport
            return transport.type;
        });
    }
    /**
     * Returns the metadata of this DApp
     */
    getOwnAppMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                senderId: yield getSenderId(yield this.beaconId),
                name: this.name,
                icon: this.iconUrl
            };
        });
    }
    /**
     * Return all known peers
     */
    getPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.transport).getPeers();
        });
    }
    /**
     * Add a new peer to the known peers
     * @param peer The new peer to add
     */
    addPeer(peer) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.transport).addPeer(peer);
        });
    }
    destroy() {
        const _super = Object.create(null, {
            destroy: { get: () => super.destroy }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this._transport.status === ExposedPromiseStatus.RESOLVED) {
                yield (yield this.transport).disconnect();
            }
            yield _super.destroy.call(this);
        });
    }
    /**
     * A "setter" for when the transport needs to be changed.
     */
    setTransport(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            if (transport) {
                if (this._transport.isSettled()) {
                    // If the promise has already been resolved we need to create a new one.
                    this._transport = ExposedPromise.resolve(transport);
                }
                else {
                    this._transport.resolve(transport);
                }
            }
            else {
                if (this._transport.isSettled()) {
                    // If the promise has already been resolved we need to create a new one.
                    this._transport = new ExposedPromise();
                }
            }
            yield this.events.emit(BeaconEvent.ACTIVE_TRANSPORT_SET, transport);
        });
    }
    addListener(transport) {
        return __awaiter(this, void 0, void 0, function* () {
            transport
                .addListener((message, connectionInfo) => __awaiter(this, void 0, void 0, function* () {
                if (typeof message === 'string') {
                    const deserializedMessage = (yield new Serializer().deserialize(message));
                    this.handleResponse(deserializedMessage, connectionInfo);
                }
            }))
                .catch((error) => logger.error('addListener', error));
        });
    }
    sendDisconnectToPeer(peer, transport) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                id: yield generateGUID(),
                version: BEACON_VERSION,
                senderId: yield getSenderId(yield this.beaconId),
                type: BeaconMessageType.Disconnect
            };
            const payload = yield new Serializer().serialize(request);
            const selectedTransport = transport !== null && transport !== void 0 ? transport : (yield this.transport);
            yield selectedTransport.send(payload, peer);
        });
    }
}
//# sourceMappingURL=Client.js.map