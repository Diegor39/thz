import { Storage } from '../storage/Storage';
import { MatrixClientStore } from './MatrixClientStore';
import { MatrixHttpClient } from './MatrixHttpClient';
import { MatrixRoom } from './models/MatrixRoom';
import { MatrixRoomService } from './services/MatrixRoomService';
import { MatrixUserService } from './services/MatrixUserService';
import { MatrixEventService } from './services/MatrixEventService';
import { MatrixClientEventEmitter } from './MatrixClientEventEmitter';
import { MatrixClientEventType, MatrixClientEvent } from './models/MatrixClientEvent';
interface MatrixClientOptions {
    baseUrl: string;
    storage: Storage;
}
interface MatrixLoginConfig {
    id: string;
    password: string;
    deviceId: string;
}
/**
 * The matrix client used to connect to the matrix network
 */
export declare class MatrixClient {
    private readonly store;
    private readonly eventEmitter;
    private readonly userService;
    private readonly roomService;
    private readonly eventService;
    private readonly httpClient;
    private isActive;
    private _isReady;
    constructor(store: MatrixClientStore, eventEmitter: MatrixClientEventEmitter, userService: MatrixUserService, roomService: MatrixRoomService, eventService: MatrixEventService, httpClient: MatrixHttpClient);
    /**
     * Create a matrix client based on the options provided
     *
     * @param config
     */
    static create(config: MatrixClientOptions): MatrixClient;
    /**
     * Return all the rooms we are currently part of
     */
    get joinedRooms(): Promise<MatrixRoom[]>;
    /**
     * Return all the rooms to which we have received invitations
     */
    get invitedRooms(): Promise<MatrixRoom[]>;
    /**
     * Return all the rooms that we left
     */
    get leftRooms(): Promise<MatrixRoom[]>;
    /**
     * Initiate the connection to the matrix node and log in
     *
     * @param user
     */
    start(user: MatrixLoginConfig): Promise<void>;
    isConnected(): Promise<void>;
    /**
     * Stop all running requests
     */
    stop(): Promise<void>;
    /**
     * Subscribe to new matrix events
     *
     * @param event
     * @param listener
     */
    subscribe<T extends MatrixClientEventType>(event: T, listener: (event: MatrixClientEvent<T>) => void): void;
    /**
     * Unsubscribe from matrix events
     *
     * @param event
     * @param listener
     */
    unsubscribe(event: MatrixClientEventType, listener: (event: MatrixClientEvent<any>) => void): void;
    /**
     * Unsubscribe from all matrix events of this type
     *
     * @param event
     * @param listener
     */
    unsubscribeAll(event: MatrixClientEventType): void;
    getRoomById(id: string): Promise<MatrixRoom>;
    /**
     * Create a private room with the supplied members
     *
     * @param members Members that will be in the room
     */
    createTrustedPrivateRoom(...members: string[]): Promise<string>;
    /**
     * Invite user to rooms
     *
     * @param user The user to be invited
     * @param roomsOrIds The rooms the user will be invited to
     */
    inviteToRooms(user: string, ...roomsOrIds: string[] | MatrixRoom[]): Promise<void>;
    /**
     * Join rooms
     *
     * @param roomsOrIds
     */
    joinRooms(...roomsOrIds: string[] | MatrixRoom[]): Promise<void>;
    /**
     * Send a text message
     *
     * @param roomOrId
     * @param message
     */
    sendTextMessage(roomId: string, message: string): Promise<void>;
    /**
     * Poll the server to get the latest data and get notified of changes
     *
     * @param interval
     * @param onSyncSuccess
     * @param onSyncError
     */
    private poll;
    /**
     * Get state from server
     */
    private sync;
    /**
     * A helper method that makes sure an access token is provided
     *
     * @param name
     * @param action
     */
    private requiresAuthorization;
    /**
     * Create a transaction ID
     */
    private createTxnId;
}
export {};
