var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { keys } from '../utils/utils';
import { MatrixRoom, MatrixRoomStatus } from './models/MatrixRoom';
import { StorageKey } from '..';
const PRESERVED_FIELDS = ['syncToken', 'rooms'];
/**
 * The class managing the local state of matrix
 */
export class MatrixClientStore {
    constructor(storage) {
        this.storage = storage;
        /**
         * The state of the matrix client
         */
        this.state = {
            isRunning: false,
            userId: undefined,
            deviceId: undefined,
            txnNo: 0,
            accessToken: undefined,
            syncToken: undefined,
            pollingTimeout: undefined,
            pollingRetries: 0,
            rooms: {}
        };
        /**
         * Listeners that will be called when the state changes
         */
        this.onStateChangedListeners = new Map();
        /**
         * A promise that resolves once the client is ready
         */
        this.waitReadyPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initFromStorage();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    /**
     * Get an item from the state
     *
     * @param key
     */
    get(key) {
        return this.state[key];
    }
    /**
     * Get the room from an ID or room instance
     *
     * @param roomOrId
     */
    getRoom(roomOrId) {
        const room = MatrixRoom.from(roomOrId, MatrixRoomStatus.UNKNOWN);
        return this.state.rooms[room.id] || room;
    }
    /**
     * Update the state with a partial state
     *
     * @param stateUpdate
     */
    update(stateUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitReady();
            const oldState = Object.assign({}, this.state);
            this.setState(stateUpdate);
            this.updateStorage(stateUpdate);
            this.notifyListeners(oldState, this.state, stateUpdate);
        });
    }
    /**
     * Register listeners that are called once the state has changed
     *
     * @param listener
     * @param subscribed
     */
    onStateChanged(listener, ...subscribed) {
        if (subscribed.length > 0) {
            subscribed.forEach((key) => {
                this.onStateChangedListeners.set(key, listener);
            });
        }
        else {
            this.onStateChangedListeners.set('all', listener);
        }
    }
    /**
     * A promise that resolves once the client is ready
     */
    waitReady() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.waitReadyPromise;
        });
    }
    /**
     * Read state from storage
     */
    initFromStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            const preserved = yield this.storage.get(StorageKey.MATRIX_PRESERVED_STATE);
            this.setState(preserved);
        });
    }
    /**
     * Prepare data before persisting it in storage
     *
     * @param toStore
     */
    prepareData(toStore) {
        const requiresPreparation = ['rooms'];
        const toStoreCopy = requiresPreparation.some((key) => toStore[key] !== undefined)
            ? JSON.parse(JSON.stringify(toStore))
            : toStore;
        // there is no need for saving messages in a persistent storage
        Object.values(toStoreCopy.rooms || {}).forEach((room) => {
            room.messages = [];
        });
        return toStoreCopy;
    }
    /**
     * Persist state in storage
     *
     * @param stateUpdate
     */
    updateStorage(stateUpdate) {
        const updatedCachedFields = Object.entries(stateUpdate).filter(([key, value]) => PRESERVED_FIELDS.includes(key) && Boolean(value));
        if (updatedCachedFields.length > 0) {
            const filteredState = {};
            PRESERVED_FIELDS.forEach((key) => {
                filteredState[key] = this.state[key];
            });
            this.storage.set(StorageKey.MATRIX_PRESERVED_STATE, this.prepareData(filteredState));
        }
    }
    /**
     * Set the state
     *
     * @param partialState
     */
    setState(partialState) {
        this.state = {
            isRunning: partialState.isRunning || this.state.isRunning,
            userId: partialState.userId || this.state.userId,
            deviceId: partialState.deviceId || this.state.deviceId,
            txnNo: partialState.txnNo || this.state.txnNo,
            accessToken: partialState.accessToken || this.state.accessToken,
            syncToken: partialState.syncToken || this.state.syncToken,
            pollingTimeout: partialState.pollingTimeout || this.state.pollingTimeout,
            pollingRetries: partialState.pollingRetries || this.state.pollingRetries,
            rooms: this.mergeRooms(this.state.rooms, partialState.rooms)
        };
    }
    /**
     * Merge room records and eliminate duplicates
     *
     * @param oldRooms
     * @param _newRooms
     */
    mergeRooms(oldRooms, _newRooms) {
        if (!_newRooms) {
            return oldRooms;
        }
        const newRooms = Array.isArray(_newRooms) ? _newRooms : Object.values(_newRooms);
        const merged = Object.assign({}, oldRooms);
        newRooms.forEach((newRoom) => {
            merged[newRoom.id] = MatrixRoom.merge(newRoom, oldRooms[newRoom.id]);
        });
        return merged;
    }
    /**
     * Notify listeners of state changes
     *
     * @param oldState
     * @param newState
     * @param stateChange
     */
    notifyListeners(oldState, newState, stateChange) {
        const listenForAll = this.onStateChangedListeners.get('all');
        if (listenForAll) {
            listenForAll(oldState, newState, stateChange);
        }
        keys(stateChange)
            .filter((key) => stateChange[key] !== undefined)
            .forEach((key) => {
            const listener = this.onStateChangedListeners.get(key);
            if (listener) {
                listener(oldState, newState, stateChange);
            }
        });
    }
}
//# sourceMappingURL=MatrixClientStore.js.map