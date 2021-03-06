/// <reference types="node" />
import { EventEmitter } from 'events';
import { MatrixStateStore, MatrixStateUpdate } from './MatrixClientStore';
export declare class MatrixClientEventEmitter extends EventEmitter {
    private readonly eventEmitProviders;
    /**
     * This method is called every time the state is changed
     *
     * @param _oldState
     * @param _newState
     * @param stateChange
     */
    onStateChanged(_oldState: MatrixStateStore, _newState: MatrixStateStore, stateChange: Partial<MatrixStateUpdate>): void;
    /**
     * Emit the message if we have listeners registered for that type
     *
     * @param eventType
     * @param object
     */
    private emitIfEvent;
    /**
     * Emit a client event
     *
     * @param eventType
     * @param content
     */
    private emitClientEvent;
    /**
     * Check if event is an invite
     *
     * @param stateChange
     */
    private isInvite;
    /**
     * Emit an invite
     *
     * @param eventType
     * @param stateChange
     */
    private emitInvite;
    /**
     * Check if event is a message
     *
     * @param stateChange
     */
    private isMessage;
    /**
     * Emit an event to all rooms
     *
     * @param eventType
     * @param stateChange
     */
    private emitMessage;
}
