import { isCreateEvent, isJoinEvent, isMessageEvent } from '../utils/events';
import { MatrixMessage } from './MatrixMessage';
export var MatrixRoomStatus;
(function (MatrixRoomStatus) {
    MatrixRoomStatus[MatrixRoomStatus["UNKNOWN"] = 0] = "UNKNOWN";
    MatrixRoomStatus[MatrixRoomStatus["JOINED"] = 1] = "JOINED";
    MatrixRoomStatus[MatrixRoomStatus["INVITED"] = 2] = "INVITED";
    MatrixRoomStatus[MatrixRoomStatus["LEFT"] = 3] = "LEFT";
})(MatrixRoomStatus || (MatrixRoomStatus = {}));
export class MatrixRoom {
    constructor(id, status = MatrixRoomStatus.UNKNOWN, members = [], messages = []) {
        this.id = id;
        this.status = status;
        this.members = members;
        this.messages = messages;
    }
    /**
     * Reconstruct rooms from a sync response
     *
     * @param roomSync
     */
    static fromSync(roomSync) {
        function create(rooms, creator) {
            return Object.entries(rooms).map(([id, room]) => creator(id, room));
        }
        return [
            ...create(roomSync.join, MatrixRoom.fromJoined),
            ...create(roomSync.invite, MatrixRoom.fromInvited),
            ...create(roomSync.leave, MatrixRoom.fromLeft)
        ];
    }
    /**
     * Reconstruct a room from an ID or object
     *
     * @param roomOrId
     * @param status
     */
    static from(roomOrId, status) {
        return typeof roomOrId === 'string'
            ? new MatrixRoom(roomOrId, status || MatrixRoomStatus.UNKNOWN)
            : status !== undefined
                ? new MatrixRoom(roomOrId.id, status, roomOrId.members, roomOrId.messages)
                : roomOrId;
    }
    /**
     * Merge new and old state and remove duplicates
     *
     * @param newState
     * @param previousState
     */
    static merge(newState, previousState) {
        if (!previousState || previousState.id !== newState.id) {
            return MatrixRoom.from(newState);
        }
        return new MatrixRoom(newState.id, newState.status, [...previousState.members, ...newState.members].filter((member, index, array) => array.indexOf(member) === index), [...previousState.messages, ...newState.messages]);
    }
    /**
     * Create a room from a join
     *
     * @param id
     * @param joined
     */
    static fromJoined(id, joined) {
        const events = [...joined.state.events, ...joined.timeline.events];
        const members = MatrixRoom.getMembersFromEvents(events);
        const messages = MatrixRoom.getMessagesFromEvents(events);
        return new MatrixRoom(id, MatrixRoomStatus.JOINED, members, messages);
    }
    /**
     * Create a room from an invite
     *
     * @param id
     * @param invited
     */
    static fromInvited(id, invited) {
        const members = MatrixRoom.getMembersFromEvents(invited.invite_state.events);
        return new MatrixRoom(id, MatrixRoomStatus.INVITED, members);
    }
    /**
     * Create a room from a leave
     *
     * @param id
     * @param left
     */
    static fromLeft(id, left) {
        const events = [...left.state.events, ...left.timeline.events];
        const members = MatrixRoom.getMembersFromEvents(events);
        const messages = MatrixRoom.getMessagesFromEvents(events);
        return new MatrixRoom(id, MatrixRoomStatus.LEFT, members, messages);
    }
    /**
     * Extract members from an event
     *
     * @param events
     */
    static getMembersFromEvents(events) {
        return MatrixRoom.getUniqueEvents(events.filter((event) => isCreateEvent(event) || isJoinEvent(event)))
            .map((event) => event.sender)
            .filter((member, index, array) => array.indexOf(member) === index);
    }
    /**
     * Extract messages from an event
     *
     * @param events
     */
    static getMessagesFromEvents(events) {
        return MatrixRoom.getUniqueEvents(events.filter(isMessageEvent))
            .map((event) => MatrixMessage.from(event))
            .filter(Boolean);
    }
    /**
     * Get unique events and remove duplicates
     *
     * @param events
     */
    static getUniqueEvents(events) {
        const eventIds = {};
        const uniqueEvents = [];
        events.forEach((event, index) => {
            const eventId = event.event_id;
            if (eventId === undefined || !(eventId in eventIds)) {
                if (eventId !== undefined) {
                    eventIds[eventId] = index;
                }
                uniqueEvents.push(event);
            }
        });
        return uniqueEvents;
    }
}
//# sourceMappingURL=MatrixRoom.js.map