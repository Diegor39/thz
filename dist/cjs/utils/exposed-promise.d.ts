export declare enum ExposedPromiseStatus {
    PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected"
}
declare type Resolve<T> = (value?: T) => void;
declare type Reject<U> = (reason?: U) => void;
/**
 * Exposed promise allow you to create a promise and then resolve it later, from the outside
 */
export declare class ExposedPromise<T = unknown, U = unknown> {
    private readonly _promise;
    private _resolve;
    private _reject;
    private _status;
    private _promiseResult;
    private _promiseError;
    get promise(): Promise<T>;
    get resolve(): Resolve<T>;
    get reject(): Reject<U>;
    get status(): ExposedPromiseStatus;
    get promiseResult(): T | undefined;
    get promiseError(): U | undefined;
    constructor();
    static resolve<T>(value?: T): ExposedPromise<T>;
    static reject<T = never, U = unknown>(reason?: U): ExposedPromise<T, U>;
    isPending(): boolean;
    isResolved(): boolean;
    isRejected(): boolean;
    isSettled(): boolean;
}
export {};
