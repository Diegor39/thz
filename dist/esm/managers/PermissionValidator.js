var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BeaconMessageType, PermissionScope } from '..';
import { getAccountIdentifier } from '../utils/get-account-identifier';
/**
 * @internalapi
 *
 * The PermissionValidator is used to check if permissions for a certain message type have been given
 */
export class PermissionValidator {
    /**
     * Check if permissions were given for a certain message type.
     *
     * PermissionRequest and BroadcastRequest will always return true.
     *
     * @param message Beacon Message
     */
    static hasPermission(message, getOne, getAll) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (message.type) {
                case BeaconMessageType.PermissionRequest:
                case BeaconMessageType.BroadcastRequest: {
                    return true;
                }
                case BeaconMessageType.OperationRequest: {
                    const accountIdentifier = yield getAccountIdentifier(message.sourceAddress, message.network);
                    const permission = yield getOne(accountIdentifier);
                    if (!permission) {
                        return false;
                    }
                    return permission.scopes.includes(PermissionScope.OPERATION_REQUEST);
                }
                case BeaconMessageType.SignPayloadRequest: {
                    const permissions = yield getAll();
                    const filteredPermissions = permissions.filter((permission) => permission.address === message.sourceAddress);
                    if (filteredPermissions.length === 0) {
                        return false;
                    }
                    return filteredPermissions.some((permission) => permission.scopes.includes(PermissionScope.SIGN));
                }
                default:
                    throw new Error('Message not handled');
            }
        });
    }
}
//# sourceMappingURL=PermissionValidator.js.map