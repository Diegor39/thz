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
 * The AccountManager provides CRUD functionality for account entities and persists them to the provided storage.
 */
export class AccountManager {
    constructor(storage) {
        this.storageManager = new StorageManager(storage, StorageKey.ACCOUNTS);
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getAll();
        });
    }
    getAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.getOne((account) => account.accountIdentifier === accountIdentifier);
        });
    }
    addAccount(accountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.addOne(accountInfo, (account) => account.accountIdentifier === accountInfo.accountIdentifier);
        });
    }
    removeAccount(accountIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((account) => account.accountIdentifier === accountIdentifier);
        });
    }
    removeAccounts(accountIdentifiers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.remove((account) => accountIdentifiers.includes(account.accountIdentifier));
        });
    }
    removeAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.storageManager.removeAll();
        });
    }
    hasPermission(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return PermissionValidator.hasPermission(message, this.getAccount.bind(this), this.getAccounts.bind(this));
        });
    }
}
//# sourceMappingURL=AccountManager.js.map