import { BeaconBaseMessage, BeaconMessageType, Network } from '../../..';
import { PartialTezosOperation } from '../../tezos/PartialTezosOperation';
/**
 * @category Message
 */
export interface OperationRequest extends BeaconBaseMessage {
    type: BeaconMessageType.OperationRequest;
    network: Network;
    operationDetails: PartialTezosOperation[];
    sourceAddress: string;
}
