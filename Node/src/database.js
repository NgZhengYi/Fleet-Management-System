const pgPromise = require('pg-promise')();
// username / password / address / database name
const url = 'postgres://postgres:root@localhost:5432/postgres';
const database = pgPromise(url);

module.exports = database;
