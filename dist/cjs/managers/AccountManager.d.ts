import { Storage, AccountInfo, BeaconMessage } from '..';
/**
 * @internalapi
 *
 * The AccountManager provides CRUD functionality for account entities and persists them to the provided storage.
 */
export declare class AccountManager {
    private readonly storageManager;
    constructor(storage: Storage);
    getAccounts(): Promise<AccountInfo[]>;
    getAccount(accountIdentifier: string): Promise<AccountInfo | undefined>;
    addAccount(accountInfo: AccountInfo): Promise<void>;
    removeAccount(accountIdentifier: string): Promise<void>;
    removeAccounts(accountIdentifiers: string[]): Promise<void>;
    removeAllAccounts(): Promise<void>;
    hasPermission(message: BeaconMessage): Promise<boolean>;
}
