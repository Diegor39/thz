import { ConnectionContext } from '../types/ConnectionContext';
import { TransportType, TransportStatus, PeerInfo, StorageKey } from '..';
import { PeerManager } from '../managers/PeerManager';
import { CommunicationClient } from './clients/CommunicationClient';
/**
 * @internalapi
 *
 *
 */
export declare abstract class Transport<T extends PeerInfo = PeerInfo, K extends StorageKey.TRANSPORT_P2P_PEERS_DAPP | StorageKey.TRANSPORT_P2P_PEERS_WALLET | StorageKey.TRANSPORT_POSTMESSAGE_PEERS_DAPP | StorageKey.TRANSPORT_POSTMESSAGE_PEERS_WALLET = any, S extends CommunicationClient = any> {
    /**
     * The type of the transport
     */
    readonly type: TransportType;
    /**
     * The name of the app
     */
    protected readonly name: string;
    /**
     * The status of the transport
     */
    protected _isConnected: TransportStatus;
    protected readonly peerManager: PeerManager<K>;
    /**
     * The client handling the encryption/decryption of messages
     */
    protected client: S;
    /**
     * The listener that will be invoked when a new peer is connected
     */
    protected newPeerListener?: (peer: T) => void;
    /**
     * The listeners that will be notified when new messages are coming in
     */
    private listeners;
    /**
     * Return the status of the connection
     */
    get connectionStatus(): TransportStatus;
    constructor(name: string, client: S, peerManager: PeerManager<K>);
    /**
     * Returns a promise that resolves to true if the transport is available, false if it is not
     */
    static isAvailable(): Promise<boolean>;
    /**
     * Connect the transport
     */
    connect(): Promise<void>;
    /**
     * Disconnect the transport
     */
    disconnect(): Promise<void>;
    /**
     * Send a message through the transport
     *
     * @param message The message to send
     * @param recipient The recipient of the message
     */
    send(message: string, peer?: PeerInfo): Promise<void>;
    /**
     * Add a listener to be called when a new message is received
     *
     * @param listener The listener that will be registered
     */
    addListener(listener: (message: unknown, connectionInfo: ConnectionContext) => void): Promise<void>;
    /**
     * Remove a listener
     *
     * @param listener
     */
    removeListener(listener: (message: string, connectionInfo: ConnectionContext) => void): Promise<void>;
    getPeers(): Promise<T[]>;
    addPeer(newPeer: T, _sendPairingResponse?: boolean): Promise<void>;
    removePeer(peerToBeRemoved: T): Promise<void>;
    removeAllPeers(): Promise<void>;
    /**
     * Notify the listeners when a new message comes in
     *
     * @param message Message
     * @param connectionInfo Context info about the connection
     */
    protected notifyListeners(message: unknown, connectionInfo: ConnectionContext): Promise<void>;
    abstract listen(publicKey: string): Promise<void>;
}
