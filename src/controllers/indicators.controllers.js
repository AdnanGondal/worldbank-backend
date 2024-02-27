const indicatorsService = require("../services/indicators.services");

const getAllIndicators = function (req, res) {
	res.status(200).json(indicatorsService.getAllIndicators());
};

const getIndicatorByCodeAndCountry = async function (req, res) {
	const indicator = req.params.indicator_code;
	const countryCode = req.params.country_code;

	const data = await indicatorsService.getSingleIndicatorData(
		indicator,
		countryCode,
	);
	res.status(200).json(data);
};

const getIndicatorByCodeAndCompareCountries = async function (req, res) {
	const indicator = req.params.indicator_code;
	const countryCode1 = req.params.country_code1;
	const countryCode2 = req.params.country_code2;

	const data = await indicatorsService.getCountryComparisionIndicatorData(
		indicator,
		countryCode1,
		countryCode2,
	);
	res.status(200).json(data);
};

module.exports = {
	getAllIndicators,
	getIndicatorByCodeAndCountry,
	getIndicatorByCodeAndCompareCountries,
};
