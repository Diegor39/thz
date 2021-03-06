import { Storage, AppMetadata } from '..';
/**
 * @internalapi
 *
 * The AppMetadataManager provides CRUD functionality for app-metadata entities and persists them to the provided storage.
 */
export declare class AppMetadataManager {
    private readonly storageManager;
    constructor(storage: Storage);
    getAppMetadataList(): Promise<AppMetadata[]>;
    getAppMetadata(senderId: string): Promise<AppMetadata | undefined>;
    addAppMetadata(appMetadata: AppMetadata): Promise<void>;
    removeAppMetadata(senderId: string): Promise<void>;
    removeAppMetadatas(senderIds: string[]): Promise<void>;
    removeAllAppMetadata(): Promise<void>;
}
