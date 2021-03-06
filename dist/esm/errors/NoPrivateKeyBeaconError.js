import { BeaconError, BeaconErrorType } from '..';
/**
 * @category Error
 */
export class NoPrivateKeyBeaconError extends BeaconError {
    constructor() {
        super(BeaconErrorType.NO_PRIVATE_KEY_FOUND_ERROR, 'The account you are trying to interact with is not available. Please make sure to add the account to your wallet and try again.');
        this.name = 'NoPrivateKeyBeaconError';
        this.title = 'Account Not Found';
    }
}
//# sourceMappingURL=NoPrivateKeyBeaconError.js.map