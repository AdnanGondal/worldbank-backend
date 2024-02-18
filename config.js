const config = {};

config.world_bank_api = {};

config.world_bank_api.getAllCountries =
	"https://api.worldbank.org/v2/countries?format=json&per_page=300";

config.world_bank_api.getIndicatorForCountry =
	"https://api.worldbank.org/v2/country/{country}/indicator/{indicator}?format=json";

module.exports = config;
