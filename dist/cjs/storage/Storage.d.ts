import { StorageKey } from '../types/storage/StorageKey';
import { StorageKeyReturnType } from '../types/storage/StorageKeyReturnType';
/**
 * @internalapi
 *
 * The storage used in the SDK
 */
export declare abstract class Storage {
    /**
     * Returns a promise that resolves to true if the storage option is available on this platform.
     */
    static isSupported(): Promise<boolean>;
    /**
     * Gets a value from storage and returns it
     *
     * @param key The storage key
     */
    abstract get<K extends StorageKey>(key: K): Promise<StorageKeyReturnType[K]>;
    /**
     * Sets a value in the storage and persist it
     *
     * @param key The storage key
     * @param value The value to be persisted
     */
    abstract set<K extends StorageKey>(key: K, value: StorageKeyReturnType[K]): Promise<void>;
    /**
     * Delete a key from storage
     *
     * @param key The storage key
     */
    abstract delete<K extends StorageKey>(key: K): Promise<void>;
}
