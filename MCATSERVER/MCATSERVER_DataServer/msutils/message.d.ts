/**
 * Defined a message class for data_exchange server and client.
 */
export interface Infomation {
    name: string;
    sectype: string;
    timestamp: string;
    keyMessage: string;
    [otherOptions: string]: any;
}
export interface Operation {
    type: string;
    target: string;
    data: string;
    [otherOptions: string]: any;
}
export interface Message {
    info: Infomation;
    operation: Operation;
    [otherOptions: string]: any;
}
