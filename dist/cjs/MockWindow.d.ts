declare type Callback = (message: unknown) => void;
/**
 * A mock for postmessage if run in node.js environment
 */
declare let windowRef: {
    postMessage: (message: string | Record<string, unknown>, _target?: string | undefined) => void;
    addEventListener: (_name: string, eventCallback: Callback) => void;
    removeEventListener: (_name: string, eventCallback: Callback) => void;
    location: {
        origin: string;
    };
};
declare const clearMockWindowState: () => void;
export { windowRef, clearMockWindowState };
