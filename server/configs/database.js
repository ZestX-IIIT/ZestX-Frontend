const { Client } = require('pg');

const client = new Client(process.env.PSQL_LINK);

module.exports = client;