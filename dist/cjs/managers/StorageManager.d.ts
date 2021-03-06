import { StorageKey, Storage, StorageKeyReturnType } from '..';
/** Type workaround for https://github.com/Microsoft/TypeScript/issues/7294#issuecomment-465794460 */
export declare type ArrayElem<A> = A extends (infer Elem)[] ? Elem : never;
/**
 * @internalapi
 *
 * The StorageManager provides CRUD functionality for specific entities and persists them to the provided storage.
 */
export declare class StorageManager<T extends StorageKey.ACCOUNTS | StorageKey.APP_METADATA_LIST | StorageKey.PERMISSION_LIST | StorageKey.TRANSPORT_P2P_PEERS_DAPP | StorageKey.TRANSPORT_P2P_PEERS_WALLET | StorageKey.TRANSPORT_POSTMESSAGE_PEERS_DAPP | StorageKey.TRANSPORT_POSTMESSAGE_PEERS_WALLET> {
    private readonly storage;
    private readonly storageKey;
    constructor(storage: Storage, storageKey: T);
    getAll(): Promise<StorageKeyReturnType[T]>;
    getOne(predicate: (element: ArrayElem<StorageKeyReturnType[T]>) => boolean): Promise<ArrayElem<StorageKeyReturnType[T]> | undefined>;
    addOne(element: ArrayElem<StorageKeyReturnType[T]>, predicate: (element: ArrayElem<StorageKeyReturnType[T]>) => boolean, overwrite?: boolean): Promise<void>;
    remove(predicate: (element: ArrayElem<StorageKeyReturnType[T]>) => boolean): Promise<void>;
    removeAll(): Promise<void>;
}
