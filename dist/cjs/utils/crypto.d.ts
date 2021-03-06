/// <reference types="node" />
import * as sodium from 'libsodium-wrappers';
/**
 * Convert a value to hex
 *
 * @param value
 */
export declare function toHex(value: any): string;
/**
 * Get the hex hash of a value
 *
 * @param key
 */
export declare function getHexHash(key: string | Buffer | Uint8Array): Promise<string>;
/**
 * Get a keypair from a seed
 *
 * @param seed
 */
export declare function getKeypairFromSeed(seed: string): Promise<sodium.KeyPair>;
/**
 * Encrypt a message with a shared key
 *
 * @param message
 * @param sharedKey
 */
export declare function encryptCryptoboxPayload(message: string, sharedKey: Uint8Array): Promise<string>;
/**
 * Decrypt a message with a shared key
 *
 * @param payload
 * @param sharedKey
 */
export declare function decryptCryptoboxPayload(payload: Uint8Array, sharedKey: Uint8Array): Promise<string>;
/**
 * Encrypt a message with a public key
 *
 * @param payload
 * @param publicKey
 */
export declare function sealCryptobox(payload: string | Buffer, publicKey: Uint8Array): Promise<string>;
/**
 * Decrypt a message with public + private key
 *
 * @param encryptedPayload
 * @param publicKey
 * @param privateKey
 */
export declare function openCryptobox(encryptedPayload: string | Buffer, publicKey: Uint8Array, privateKey: Uint8Array): Promise<string>;
/**
 * Get an address from the public key
 *
 * @param publicKey
 */
export declare function getAddressFromPublicKey(publicKey: string): Promise<string>;
/**
 * Get the recipient string used in the matrix message
 *
 * @param recipientHash
 * @param relayServer
 */
export declare function recipientString(recipientHash: string, relayServer: string): string;
