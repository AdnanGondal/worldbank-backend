const config = {};

config.world_bank_api = {};

config.world_bank_api.getAllCountries =
	"https://api.worldbank.org/v2/countries?format=json&per_page=300";

module.exports = config;
