/**
 * Defined a message class for data_exchange server and client.
 */
exports.Message = () => {
    this.Info = {
        name: "abc",
        type: "ws",
        timestamp: "123"
    };

    this.KeyMessage = "123";

    this.Operation = {
        type: "add",
        targ: "store",
        data: "123"
    };
}