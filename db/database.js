const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'app',
    password: 'Pass.2024',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
