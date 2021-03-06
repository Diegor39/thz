var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StorageKey } from '..';
import { StorageManager } from './StorageManager';
/**
 * @internalapi
 *
 * The AppMetadataManager provides CRUD functionality for app-metadata entities and persists them to the provided storage.
 */
export class AppMetadataManager {
    constructor(storage) {
        this.storageManager = new StorageManager(storage, StorageKey.APP_METADATA_LIST);
    }
    getAppMetadataList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((appMetadata) => appMetadata.senderId === senderId);
        });
    }
    addAppMetadata(appMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(appMetadata, (appMetadataElement) => appMetadataElement.senderId === appMetadata.senderId);
        });
    }
    removeAppMetadata(senderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((appMetadata) => appMetadata.senderId === senderId);
        });
    }
    removeAppMetadatas(senderIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((appMetadata) => senderIds.includes(appMetadata.senderId));
        });
    }
    removeAllAppMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
}
//# sourceMappingURL=AppMetadataManager.js.map