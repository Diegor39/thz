var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TransportStatus, StorageKey, PostMessageTransport } from '..';
import { Logger } from '../utils/Logger';
const logger = new Logger('DappPostMessageTransport');
/**
 * @internalapi
 *
 *
 */
export class DappPostMessageTransport extends PostMessageTransport {
    constructor(name, keyPair, storage) {
        super(name, keyPair, storage, StorageKey.TRANSPORT_POSTMESSAGE_PEERS_DAPP);
    }
    startOpenChannelListener() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.listenForChannelOpening((peer) => __awaiter(this, void 0, void 0, function* () {
                logger.log('connect', `received PostMessagePairingResponse`, peer);
                yield this.addPeer(peer);
                this._isConnected = TransportStatus.CONNECTED;
                if (this.newPeerListener) {
                    this.newPeerListener(peer);
                    this.newPeerListener = undefined; // TODO: Remove this once we use the id
                }
            }));
        });
    }
    listenForNewPeer(newPeerListener) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('listenForNewPeer');
            this.newPeerListener = newPeerListener;
        });
    }
    stopListeningForNewPeers() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.log('stopListeningForNewPeers');
            this.newPeerListener = undefined;
        });
    }
}
//# sourceMappingURL=DappPostMessageTransport.js.map