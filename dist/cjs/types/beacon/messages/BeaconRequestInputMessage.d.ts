import { Optional } from '../../../utils/utils';
import { PermissionRequest, OperationRequest, SignPayloadRequest, BroadcastRequest } from '../../..';
/**
 * @internalapi
 * @category DApp
 */
export declare type IgnoredRequestInputProperties = 'id' | 'senderId' | 'version';
/**
 * @internalapi
 * @category DApp
 */
export declare type PermissionRequestInput = Optional<PermissionRequest, IgnoredRequestInputProperties>;
/**
 * @internalapi
 * @category DApp
 */
export declare type OperationRequestInput = Optional<OperationRequest, IgnoredRequestInputProperties>;
/**
 * @internalapi
 * @category DApp
 */
export declare type SignPayloadRequestInput = Optional<SignPayloadRequest, IgnoredRequestInputProperties>;
/**
 * @internalapi
 * @category DApp
 */
/**
 * @internalapi
 * @category DApp
 */
export declare type BroadcastRequestInput = Optional<BroadcastRequest, IgnoredRequestInputProperties>;
/**
 * @internalapi
 * @category DApp
 */
export declare type BeaconRequestInputMessage = PermissionRequestInput | OperationRequestInput | SignPayloadRequestInput | BroadcastRequestInput;
