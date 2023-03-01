const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function teardownDatabase(client) {
  await client.connect();
}

async function createDatabaseTables(client) {
  await client.connect();
  createUsersTable(client);
  // addSeedData(client);
  //createSessionsTable(client);
  // createHistoryTable(client);
  // createCountrySearchesTable(client);
  // createIndicatorSearchesTable(client);
  await client.end();
  return;
}

async function createUsersTable(client) {
  const sql = `
  CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  try {
    const res = await client.query(sql);
    console.log('Users table created');
    return;
  } catch (err) {
    console.log(err);
    console.log('Users table issue');
    return;
  }
}

async function createSessionsTable(client) {
  const sql = `
  CREATE TABLE sessions(
  uuid TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
  )`;

  try {
    const res = await client.query(sql);
    console.log('Sessions table created');
    return;
  } catch (err) {
    console.log(err);
    console.log('Sessions table issue');
    return;
  }
}

async function addSeedData(client) {
  const sql = `
 INSERT INTO users(username, password) VALUES('test', 'test')`;

  try {
    const res = await client.query(sql);
    console.log('Seed Data added');
    return;
  } catch (err) {
    console.log(err);
    console.log('Seed data issue');
    return;
  }
}

async function createSessionsTable(client) {
  const sql = `
  CREATE TABLE sessions(
  uuid TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
  )`;

  try {
    const res = await client.query(sql);
    console.log('Sessions table created');
    return;
  } catch (err) {
    console.log(err);
    console.log('Sessions table issue');
    return;
  }
}

async function createHistoryTable(client) {
  const sql = `
  CREATE TABLE history(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    country1_id TEXT DEFAULT NULL,
    country2_id TEXT DEFAULT NULL,
    indicator_id TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
  `;
  try {
    const res = await client.query(sql);
    console.log('History table created');
    return;
  } catch (err) {
    console.log(err);
    console.log('History table issue');
    return;
  }
}

async function createCountrySearchesTable(client) {
  const sql = `
  CREATE TABLE countrysearches(
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    indicator_id TEXT NOT NULL,
    history_id SERIAL NOT NULL REFERENCES history(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
  `;
  try {
    const res = await client.query(sql);
    console.log('CountrySearches table created');
    return;
  } catch (err) {
    console.log(err);
    console.log('CountrySearches table issue');
    return;
  }
}
async function createIndicatorSearchesTable(client) {
  const sql = `
  CREATE TABLE indicatorSearches(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    history_id SERIAL NOT NULL REFERENCES history(id)
  )
  `;
  try {
    const res = await client.query(sql);
    console.log('IndicatorSearches table created');
    return;
  } catch (err) {
    console.log(err);
    console.log('IndicatorSearches table issue');
    return;
  }
}

module.exports = {
  createDatabaseTables,
};
