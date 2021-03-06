import { ExposedPromise } from '../../utils/exposed-promise';
import { ConnectionContext } from '../../types/ConnectionContext';
import { TransportType, TransportStatus, AccountInfo, PeerInfo, Transport, AppMetadata } from '../..';
import { BeaconEventHandler } from '../../events';
import { BeaconClient } from '../beacon-client/BeaconClient';
import { AccountManager } from '../../managers/AccountManager';
import { BeaconRequestMessage } from '../../types/beacon/BeaconRequestMessage';
import { ClientOptions } from './ClientOptions';
/**
 * @internalapi
 *
 * This abstract class handles the a big part of the logic that is shared between the dapp and wallet client.
 * For example, it selects and manages the transport and accounts.
 */
export declare abstract class Client extends BeaconClient {
    protected readonly accountManager: AccountManager;
    protected handleResponse: (_event: BeaconRequestMessage, connectionInfo: ConnectionContext) => void;
    /**
     * How many requests can be sent after another
     */
    protected readonly rateLimit: number;
    /**
     * The time window in seconds in which the "rateLimit" is checked
     */
    protected readonly rateLimitWindowInSeconds: number;
    /**
     * Stores the times when requests have been made to determine if the rate limit has been reached
     */
    protected requestCounter: number[];
    protected readonly events: BeaconEventHandler;
    protected readonly matrixNodes: string[];
    protected _transport: ExposedPromise<Transport<any>>;
    protected get transport(): Promise<Transport<any>>;
    /**
     * Returns the connection status of the Client
     */
    get connectionStatus(): TransportStatus;
    /**
     * Returns whether or not the transaport is ready
     */
    get ready(): Promise<void>;
    constructor(config: ClientOptions);
    /**
     * Return all locally known accounts
     */
    getAccounts(): Promise<AccountInfo[]>;
    /**
     * Return the account by ID
     * @param accountIdentifier The ID of an account
     */
    getAccount(accountIdentifier: string): Promise<AccountInfo | undefined>;
    /**
     * Remove the account by ID
     * @param accountIdentifier The ID of an account
     */
    removeAccount(accountIdentifier: string): Promise<void>;
    /**
     * Remove all locally stored accounts
     */
    removeAllAccounts(): Promise<void>;
    /**
     * Add a new request (current timestamp) to the pending requests, remove old ones and check if we are above the limit
     */
    addRequestAndCheckIfRateLimited(): Promise<boolean>;
    /**
     * This method initializes the client. It will check if the connection should be established to a
     * browser extension or if the P2P transport should be used.
     *
     * @param transport A transport that can be provided by the user
     */
    init(transport: Transport<any>): Promise<TransportType>;
    /**
     * Returns the metadata of this DApp
     */
    getOwnAppMetadata(): Promise<AppMetadata>;
    /**
     * Return all known peers
     */
    getPeers(): Promise<PeerInfo[]>;
    /**
     * Add a new peer to the known peers
     * @param peer The new peer to add
     */
    addPeer(peer: PeerInfo): Promise<void>;
    destroy(): Promise<void>;
    /**
     * A "setter" for when the transport needs to be changed.
     */
    protected setTransport(transport?: Transport<any>): Promise<void>;
    protected addListener(transport: Transport<any>): Promise<void>;
    protected sendDisconnectToPeer(peer: PeerInfo, transport?: Transport<any>): Promise<void>;
}
