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
import { PermissionValidator } from './PermissionValidator';
/**
 * @internalapi
 *
 * The PermissionManager provides CRUD functionality for permission entities and persists them to the provided storage.
 */
export class PermissionManager {
    constructor(storage) {
        this.storageManager = new StorageManager(storage, StorageKey.PERMISSION_LIST);
    }
    getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getPermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((permission) => permission.accountIdentifier === accountIdentifier);
        });
    }
    addPermission(permissionInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(permissionInfo, (permission) => permission.accountIdentifier === permissionInfo.accountIdentifier);
        });
    }
    removePermission(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((permissionInfo) => permissionInfo.accountIdentifier === accountIdentifier);
        });
    }
    removePermissions(accountIdentifiers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((permission) => accountIdentifiers.includes(permission.accountIdentifier));
        });
    }
    removeAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
    hasPermission(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return PermissionValidator.hasPermission(message, this.getPermission.bind(this), this.getPermissions.bind(this));
        });
    }
}
//# sourceMappingURL=PermissionManager.js.map