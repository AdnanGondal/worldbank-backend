require("dotenv").config();

const config = {};

config.world_bank_api = {};

config.world_bank_api.getAllCountries =
	"https://api.worldbank.org/v2/countries?format=json&per_page=300";

config.world_bank_api.getIndicatorForCountry =
	"https://api.worldbank.org/v2/country/{country}/indicator/{indicator}?format=json";

config.postgres = {};

config.postgres.pg_user = process.env.PGUSER || "postgres";
config.postgres.pg_host = process.env.PGHOST || "localhost";
config.postgres.pg_password = process.env.PGPASSWORD || "password";
config.postgres.pg_database = process.env.PGDATABASE || "worldbank";
config.postgres.pg_port = process.env.PGPORT || "5432";

module.exports = config;
