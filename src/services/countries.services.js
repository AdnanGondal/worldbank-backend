const worldBankClient = require("../client/worldBank.client")

const getAllCountries = async () => {
	const countryList = await worldBankClient.getAllCountries();
	return countryList;
};


module.exports = {
	getAllCountries
};
