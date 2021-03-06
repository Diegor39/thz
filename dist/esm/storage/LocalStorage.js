var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { defaultValues } from '../types/storage/StorageKeyReturnDefaults';
/**
 * @internalapi
 *
 * A storage that can be used in the browser
 */
export class LocalStorage {
    constructor(prefix) {
        this.prefix = prefix;
    }
    static isSupported() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(Boolean(typeof window !== 'undefined') && Boolean(window.localStorage));
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = localStorage.getItem(this.getPrefixedKey(key));
            if (!value) {
                if (typeof defaultValues[key] === 'object') {
                    return JSON.parse(JSON.stringify(defaultValues[key]));
                }
                else {
                    return defaultValues[key];
                }
            }
            else {
                try {
                    return JSON.parse(value);
                }
                catch (jsonParseError) {
                    return value; // TODO: Validate storage
                }
            }
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof value === 'string') {
                return localStorage.setItem(this.getPrefixedKey(key), value);
            }
            else {
                return localStorage.setItem(this.getPrefixedKey(key), JSON.stringify(value));
            }
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(localStorage.removeItem(this.getPrefixedKey(key)));
        });
    }
    getPrefixedKey(key) {
        return this.prefix ? `${this.prefix}-${key}` : key;
    }
}
//# sourceMappingURL=LocalStorage.js.map