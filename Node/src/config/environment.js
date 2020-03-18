const environment = {
    database: 'Fleet',
    username: 'root',
    password: '',
    host: 'localhost',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = environment;
