import { Storage } from '../..';
/**
 * @internalapi
 */
export interface BeaconClientOptions {
    /**
     * Name of the application
     */
    name: string;
    /**
     * A URL to the icon of the application
     */
    iconUrl?: string;
    /**
     * A URL to the website of the application
     */
    appUrl?: string;
    /**
     * The storage that will be used by the SDK
     */
    storage: Storage;
}
