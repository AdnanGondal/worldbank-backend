const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const query = async (query, params = null) => {
  let response;

  if (params) {
    response = await pool.query(query, params);
  } else {
    response = await pool.query(query);
  }

  return response;
};

const getClient = async () => {
  const response = await pool.connect();
  return response;
};

module.exports = {
  query,
  getClient,
};
