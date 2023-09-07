//Database connection
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "fitnesstracker",
    password: "reyan#",
    port: 5432,
})

//exporting pool to facilitate queries
module.exports = pool;
