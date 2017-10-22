/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

module.exports = {
    development: {
        connectionString: "mongodb://localhost:27017/demo-db",
        port: 3000
    },
    production: {
        connectionString: "mongodb://localhost:27017/demo-db",
        port: process.env.PORT
    }
};