const express = require("express");
const indicatorsController = require("../controllers/indicators.controllers");
const router = express.Router();

router.get("/", indicatorsController.getAllIndicators);

router.get(
	"/:indicator_code/countries/:country_code",
	indicatorsController.getIndicatorByCodeAndCountry,
);

router.get(
	"/:indicator_code/countries/:country_code1/:country_code2",
	indicatorsController.getIndicatorByCodeAndCompareCountries,
);

module.exports = router;
