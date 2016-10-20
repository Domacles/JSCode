/**
 * Defined a Context class for server config.
 */
export interface Address {
    name: string;
    port: number;
    [otherOptions: string]: any;
}
export interface Security {
    type: string;
    keys: string;
    [otherOptions: string]: any;
}
export interface MsConfig {
    hostAddress: Address;
    redisAddress: Address;
    security: Security;
    [otherOptions: string]: any;
}
