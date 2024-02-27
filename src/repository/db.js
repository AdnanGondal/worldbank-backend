const { Pool } = require("pg");
const config = require("../../config");

const pool = new Pool({
	user: config.postgres.pg_user,
	host: config.postgres.pg_host,
	database: config.postgres.pg_database,
	password: config.postgres.pg_password,
	port: config.postgres.pg_port,
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
