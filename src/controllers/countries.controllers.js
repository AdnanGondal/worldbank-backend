const countriesService = require("../services/countries.services");

const getAllCountries = async function (req, res) {
	const countriesList = await countriesService.getAllCountries();
	res.status(200).json(countriesList);
};

module.exports = {
	getAllCountries,
};
