const indicatorsService = require("../services/indicators.services");

const getAllIndicators = function (req, res) {
	res.status(200).json(indicatorsService.getAllIndicators());
};

const getIndicatorByCodeAndCountry = function (req, res) {
	res.status(200).json(indicatorsService.getSingleIndicatorData());
};

module.exports = {
	getAllIndicators,
	getIndicatorByCodeAndCountry,
};
