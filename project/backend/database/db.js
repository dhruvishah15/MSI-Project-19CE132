const cli = require("nodemon/lib/cli");
const { Pool, Client } = require("pg");

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'dhruvi',
    port: 5432
});

client.connect().then(() => {
  console.log("database connected");
});

module.exports = client;