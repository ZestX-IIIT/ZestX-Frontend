const { Client } = require('pg');

// const client = new Client({
//     user: process.env.PSQL_USER,
//     host: process.env.PSQL_HOST,
//     database: process.env.PSQL_DATABASE,
//     password: toString(process.env.PSQL_PASSWORD),
//     port: 5432,
// });

const client = new Client('postgres://ztdpkhlb:TD7PFmhsnMVQQXtddjeqhrg0akVvDivA@john.db.elephantsql.com/ztdpkhlb');

module.exports = client;