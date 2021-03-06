export var BeaconMessageType;
(function (BeaconMessageType) {
    BeaconMessageType["PermissionRequest"] = "permission_request";
    BeaconMessageType["SignPayloadRequest"] = "sign_payload_request";
    // EncryptPayloadRequest = 'encrypt_payload_request',
    BeaconMessageType["OperationRequest"] = "operation_request";
    BeaconMessageType["BroadcastRequest"] = "broadcast_request";
    BeaconMessageType["PermissionResponse"] = "permission_response";
    BeaconMessageType["SignPayloadResponse"] = "sign_payload_response";
    // EncryptPayloadResponse = 'encrypt_payload_response',
    BeaconMessageType["OperationResponse"] = "operation_response";
    BeaconMessageType["BroadcastResponse"] = "broadcast_response";
    BeaconMessageType["Acknowledge"] = "acknowledge";
    BeaconMessageType["Disconnect"] = "disconnect";
    BeaconMessageType["Error"] = "error";
})(BeaconMessageType || (BeaconMessageType = {}));
//# sourceMappingURL=BeaconMessageType.js.map