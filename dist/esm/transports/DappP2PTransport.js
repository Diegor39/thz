var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StorageKey, P2PTransport, TransportStatus } from '..';
import { Logger } from '../utils/Logger';
const logger = new Logger('DappP2PTransport');
/**
 * @internalapi
 *
 *
 */
export class DappP2PTransport extends P2PTransport {
    constructor(name, keyPair, storage, matrixNodes, iconUrl, appUrl) {
        super(name, keyPair, storage, matrixNodes, StorageKey.TRANSPORT_P2P_PEERS_DAPP, iconUrl, appUrl);
    }
    startOpenChannelListener() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.listenForChannelOpening((peer) => __awaiter(this, void 0, void 0, function* () {
                logger.log('listenForNewPeer', `new publicKey`, peer.publicKey);
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
//# sourceMappingURL=DappP2PTransport.js.map