const MariaDB = require('mariadb');
const config = require('./environment.js');

// const connection = MariaDB.createConnection({
//     database: config.database,
//     host: config.host,
//     user: config.username,
//     password: config.password
// }).then(result => {
//     console.log("MariaDB connected !!!");
//     console.log("Connection ID : " + result.threadId);
// }).catch(error => {
//     console.log("Unable connect to MariaDB : " + error);
// });

const pool = MariaDB.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

module.exports = pool;
// module.exports = connection;
