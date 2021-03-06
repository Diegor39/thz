import { EventEmitter } from 'events';
import { keys } from '../utils/utils';
import { MatrixRoomStatus } from './models/MatrixRoom';
import { MatrixClientEventType } from './models/MatrixClientEvent';
export class MatrixClientEventEmitter extends EventEmitter {
    constructor() {
        super(...arguments);
        this.eventEmitProviders = new Map([
            [MatrixClientEventType.INVITE, () => [this.isInvite, this.emitInvite.bind(this)]],
            [MatrixClientEventType.MESSAGE, () => [this.isMessage, this.emitMessage.bind(this)]]
        ]);
    }
    /**
     * This method is called every time the state is changed
     *
     * @param _oldState
     * @param _newState
     * @param stateChange
     */
    onStateChanged(_oldState, _newState, stateChange) {
        for (const event of keys(MatrixClientEventType)) {
            this.emitIfEvent(MatrixClientEventType[event], stateChange);
        }
    }
    /**
     * Emit the message if we have listeners registered for that type
     *
     * @param eventType
     * @param object
     */
    emitIfEvent(eventType, object) {
        const provider = this.eventEmitProviders.get(eventType);
        if (provider) {
            const [predicate, emitter] = provider();
            if (predicate(object)) {
                emitter(eventType, object);
            }
        }
    }
    /**
     * Emit a client event
     *
     * @param eventType
     * @param content
     */
    emitClientEvent(eventType, content, timestamp) {
        this.emit(eventType, {
            type: eventType,
            content,
            timestamp
        });
    }
    /**
     * Check if event is an invite
     *
     * @param stateChange
     */
    isInvite(stateChange) {
        return stateChange.rooms
            ? stateChange.rooms.some((room) => room.status === MatrixRoomStatus.INVITED)
            : false;
    }
    /**
     * Emit an invite
     *
     * @param eventType
     * @param stateChange
     */
    emitInvite(eventType, stateChange) {
        stateChange.rooms
            .filter((room) => room.status === MatrixRoomStatus.INVITED)
            .map((room) => [room.id, room.members])
            .forEach(([id, members]) => {
            this.emitClientEvent(eventType, {
                roomId: id,
                members: members
            });
        });
    }
    /**
     * Check if event is a message
     *
     * @param stateChange
     */
    isMessage(stateChange) {
        return stateChange.rooms ? stateChange.rooms.some((room) => room.messages.length > 0) : false;
    }
    /**
     * Emit an event to all rooms
     *
     * @param eventType
     * @param stateChange
     */
    emitMessage(eventType, stateChange) {
        stateChange.rooms
            .filter((room) => room.messages.length > 0)
            .map((room) => room.messages.map((message) => [room.id, message, message.timestamp]))
            .reduce((flatten, toFlatten) => flatten.concat(toFlatten), [])
            .forEach(([roomId, message, timestamp]) => {
            this.emitClientEvent(eventType, {
                roomId,
                message
            }, timestamp);
        });
    }
}
//# sourceMappingURL=MatrixClientEventEmitter.js.map