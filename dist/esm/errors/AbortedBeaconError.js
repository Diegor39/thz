import { BeaconError, BeaconErrorType } from '..';
/**
 * @category Error
 */
export class AbortedBeaconError extends BeaconError {
    constructor() {
        super(BeaconErrorType.ABORTED_ERROR, 'The action was aborted by the user.');
        this.name = 'UnknownBeaconError';
        this.title = 'Aborted';
    }
}
//# sourceMappingURL=AbortedBeaconError.js.map