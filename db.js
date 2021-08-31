const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "codex123",
    database: "greetingsDB",
    host: "localhost",
    port: 5432
})

module.exports = pool;