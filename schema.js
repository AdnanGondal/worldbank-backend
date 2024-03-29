const { Client } = require("pg");
const config = require("./config");

const client = new Client({
	user: config.postgres.pg_user,
	host: config.postgres.pg_host,
	database: config.postgres.pg_database,
	password: config.postgres.pg_password,
	port: config.postgres.pg_port,
});

createDatabaseTables(client);

async function createDatabaseTables() {
	await client.connect();
	//teardownDatabase(client); //WARNING: All data will be lost if used in deployed environment
	await createUsersTable(client);
	await createSessionsTable(client);
	// createHistoryTable(client);
	// createCountrySearchesTable(client);
	// createIndicatorSearchesTable(client);
	// addSeedData(client);
	await client.end();
	return;
}

async function teardownDatabase(client) {
	const sql = `
  DROP DATABASE IF EXISTS worldbank`;
	try {
		const res = await client.query(sql);
		console.log("Database removed");
		return;
	} catch (err) {
		console.log(err);
		console.log("Remove database issue");
		return;
	}
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
		console.log("Users table created");
		return;
	} catch (err) {
		console.log(err);
		console.log("Users table issue");
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
		console.log("Sessions table created");
		return;
	} catch (err) {
		console.log(err);
		console.log("Sessions table issue");
		return;
	}
}

async function addSeedData(client) {
	const sql = `
 INSERT INTO users(username, password) VALUES('test', 'test')`;

	try {
		const res = await client.query(sql);
		console.log("Seed Data added");
		return;
	} catch (err) {
		console.log(err);
		console.log("Seed data issue");
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
		console.log("History table created");
		return;
	} catch (err) {
		console.log(err);
		console.log("History table issue");
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
		console.log("CountrySearches table created");
		return;
	} catch (err) {
		console.log(err);
		console.log("CountrySearches table issue");
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
		console.log("IndicatorSearches table created");
		return;
	} catch (err) {
		console.log(err);
		console.log("IndicatorSearches table issue");
		return;
	}
}

module.exports = {
	createDatabaseTables,
};
