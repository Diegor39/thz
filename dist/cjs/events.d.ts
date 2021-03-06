import { AlertButton } from './ui/alert/Alert';
import { ExtendedP2PPairingResponse } from './types/P2PPairingResponse';
import { PostMessagePairingRequest } from './types/PostMessagePairingRequest';
import { ExtendedPostMessagePairingResponse } from './types/PostMessagePairingResponse';
import { BlockExplorer } from './utils/block-explorer';
import { P2PPairingRequest, AccountInfo, ErrorResponse, PermissionResponseOutput, OperationResponseOutput, BroadcastResponseOutput, SignPayloadResponseOutput, Network, ConnectionContext, Transport, NetworkType, AcknowledgeResponse } from '.';
/**
 * The different events that can be emitted by the beacon-sdk
 */
export declare enum BeaconEvent {
    PERMISSION_REQUEST_SENT = "PERMISSION_REQUEST_SENT",
    PERMISSION_REQUEST_SUCCESS = "PERMISSION_REQUEST_SUCCESS",
    PERMISSION_REQUEST_ERROR = "PERMISSION_REQUEST_ERROR",
    OPERATION_REQUEST_SENT = "OPERATION_REQUEST_SENT",
    OPERATION_REQUEST_SUCCESS = "OPERATION_REQUEST_SUCCESS",
    OPERATION_REQUEST_ERROR = "OPERATION_REQUEST_ERROR",
    SIGN_REQUEST_SENT = "SIGN_REQUEST_SENT",
    SIGN_REQUEST_SUCCESS = "SIGN_REQUEST_SUCCESS",
    SIGN_REQUEST_ERROR = "SIGN_REQUEST_ERROR",
    BROADCAST_REQUEST_SENT = "BROADCAST_REQUEST_SENT",
    BROADCAST_REQUEST_SUCCESS = "BROADCAST_REQUEST_SUCCESS",
    BROADCAST_REQUEST_ERROR = "BROADCAST_REQUEST_ERROR",
    ACKNOWLEDGE_RECEIVED = "ACKNOWLEDGE_RECEIVED",
    LOCAL_RATE_LIMIT_REACHED = "LOCAL_RATE_LIMIT_REACHED",
    NO_PERMISSIONS = "NO_PERMISSIONS",
    ACTIVE_ACCOUNT_SET = "ACTIVE_ACCOUNT_SET",
    ACTIVE_TRANSPORT_SET = "ACTIVE_TRANSPORT_SET",
    SHOW_PREPARE = "SHOW_PREPARE",
    HIDE_UI = "HIDE_UI",
    PAIR_INIT = "PAIR_INIT",
    PAIR_SUCCESS = "PAIR_SUCCESS",
    CHANNEL_CLOSED = "CHANNEL_CLOSED",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    UNKNOWN = "UNKNOWN"
}
export interface WalletInfo {
    name: string;
    type?: 'extension' | 'mobile' | 'web' | 'desktop';
    icon?: string;
    deeplink?: string;
}
export interface ExtraInfo {
    resetCallback?(): Promise<void>;
}
interface RequestSentInfo {
    extraInfo: ExtraInfo;
    walletInfo: WalletInfo;
}
/**
 * The type of the payload of the different BeaconEvents
 */
export interface BeaconEventType {
    [BeaconEvent.PERMISSION_REQUEST_SENT]: RequestSentInfo;
    [BeaconEvent.PERMISSION_REQUEST_SUCCESS]: {
        account: AccountInfo;
        output: PermissionResponseOutput;
        blockExplorer: BlockExplorer;
        connectionContext: ConnectionContext;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.PERMISSION_REQUEST_ERROR]: {
        errorResponse: ErrorResponse;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.OPERATION_REQUEST_SENT]: RequestSentInfo;
    [BeaconEvent.OPERATION_REQUEST_SUCCESS]: {
        account: AccountInfo;
        output: OperationResponseOutput;
        blockExplorer: BlockExplorer;
        connectionContext: ConnectionContext;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.OPERATION_REQUEST_ERROR]: {
        errorResponse: ErrorResponse;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.SIGN_REQUEST_SENT]: RequestSentInfo;
    [BeaconEvent.SIGN_REQUEST_SUCCESS]: {
        output: SignPayloadResponseOutput;
        connectionContext: ConnectionContext;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.SIGN_REQUEST_ERROR]: {
        errorResponse: ErrorResponse;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.BROADCAST_REQUEST_SENT]: RequestSentInfo;
    [BeaconEvent.BROADCAST_REQUEST_SUCCESS]: {
        network: Network;
        output: BroadcastResponseOutput;
        blockExplorer: BlockExplorer;
        connectionContext: ConnectionContext;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.BROADCAST_REQUEST_ERROR]: {
        errorResponse: ErrorResponse;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.ACKNOWLEDGE_RECEIVED]: {
        message: AcknowledgeResponse;
        extraInfo: ExtraInfo;
        walletInfo: WalletInfo;
    };
    [BeaconEvent.LOCAL_RATE_LIMIT_REACHED]: undefined;
    [BeaconEvent.NO_PERMISSIONS]: undefined;
    [BeaconEvent.ACTIVE_ACCOUNT_SET]: AccountInfo;
    [BeaconEvent.ACTIVE_TRANSPORT_SET]: Transport;
    [BeaconEvent.SHOW_PREPARE]: {
        walletInfo?: WalletInfo;
    };
    [BeaconEvent.HIDE_UI]: undefined;
    [BeaconEvent.PAIR_INIT]: {
        p2pPeerInfo: () => Promise<P2PPairingRequest>;
        postmessagePeerInfo: () => Promise<PostMessagePairingRequest>;
        preferredNetwork: NetworkType;
        abortedHandler?(): void;
        disclaimerText?: string;
    };
    [BeaconEvent.PAIR_SUCCESS]: ExtendedPostMessagePairingResponse | ExtendedP2PPairingResponse;
    [BeaconEvent.CHANNEL_CLOSED]: string;
    [BeaconEvent.INTERNAL_ERROR]: string;
    [BeaconEvent.UNKNOWN]: undefined;
}
export declare type BeaconEventHandlerFunction<T = unknown> = (data: T, eventCallback?: AlertButton[]) => void | Promise<void>;
/**
 * The default event handlers
 */
export declare const defaultEventCallbacks: {
    [key in BeaconEvent]: BeaconEventHandlerFunction<BeaconEventType[key]>;
};
/**
 * @internalapi
 *
 * Handles beacon events
 */
export declare class BeaconEventHandler {
    private readonly callbackMap;
    constructor(eventsToOverride?: {
        [key in BeaconEvent]?: {
            handler: BeaconEventHandlerFunction<BeaconEventType[key]>;
        };
    }, overrideAll?: boolean);
    /**
     * A method to subscribe to a specific beacon event and register a callback
     *
     * @param event The event being emitted
     * @param eventCallback The callback that will be invoked
     */
    on<K extends BeaconEvent>(event: K, eventCallback: BeaconEventHandlerFunction<BeaconEventType[K]>): Promise<void>;
    /**
     * Emit a beacon event
     *
     * @param event The event being emitted
     * @param data The data to be emit
     */
    emit<K extends BeaconEvent>(event: K, data?: BeaconEventType[K], eventCallback?: AlertButton[]): Promise<void>;
    /**
     * Override beacon event default callbacks. This can be used to disable default alert/toast behaviour
     *
     * @param eventsToOverride An object with the events to override
     */
    private overrideDefaults;
    /**
     * Set all event callbacks to a specific handler.
     */
    private setAllHandlers;
}
export {};
