/** Denotes the status of a computation. */
export enum Status {
    /** The computation completed successfully (although maybe with errors). */
    OK = 'OK',

    /** An error occurred while performing the computation. */
    ERROR = 'ERROR',
}

/** A response message with status. */
export type StatusAnd<T> =
    | ReadyStatusAnd<T>
    | ErrorStatusAnd;

/** The Ready status. */
export declare interface ReadyStatusAnd<T> {
    readonly status: Status.OK;
    /** The result of the computation. */
    readonly result: T;
}

/** The Error status. */
export declare interface ErrorStatusAnd {
    readonly status: Status.ERROR;
    /** The error that occurred. */
    readonly error: string;
}

/** Status that a computation has completed. */
export function ready<T>(result: T): ReadyStatusAnd<T> {
    return { status: Status.OK, result };
}

/** * Returns whether the given object is a ReadyStatusAnd object. */
export function isReady<T>(
    statusAnd?: StatusAnd<T>,
): statusAnd is ReadyStatusAnd<T> {
    return statusAnd?.status === Status.OK;
}

/** Status that a computation has failed. */
export function error(error: string): ErrorStatusAnd {
    return { status: Status.ERROR, error };
}

/** Returns whether the given object is an ErrorStatusAnd object. */
export function isError<T>(
    statusAnd?: StatusAnd<T>,
): statusAnd is ErrorStatusAnd {
    return statusAnd?.status === Status.ERROR;
}
