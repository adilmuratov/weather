const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "02200270",
    host: "localhost",
    port: 5432,
    database: "node_postgres"
});

module.exports = pool;