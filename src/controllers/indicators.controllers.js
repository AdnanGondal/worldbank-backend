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

module.exports = {
	getAllIndicators,
	getIndicatorByCodeAndCountry,
};
