const pgPromise = require('pg-promise')();
// username / password / address / database name
const url = 'postgres://postgres:root@localhost:5432/postgres';
// pgPromise.pg.defaults.ssl = true;
const database = pgPromise(url);

module.exports = database;
