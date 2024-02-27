const worldBankClient = require("../client/worldBank.client");

const getAllIndicators = function () {
	return getIndicatorData();
};

const getSingleIndicatorData = async function (indicator, country) {
	const indicatorData = await worldBankClient.getIndicatorByCodeAndCountry(
		indicator,
		country,
	);
	return { data: [arrangeIndicatorData(indicatorData)] };
};

const getCountryComparisionIndicatorData = async function (
	indicator,
	country1,
	country2,
) {
	const indicatorData1 = await worldBankClient.getIndicatorByCodeAndCountry(
		indicator,
		country1,
	);
	const indicatorData2 = await worldBankClient.getIndicatorByCodeAndCountry(
		indicator,
		country2,
	);
	return {
		data: [
			arrangeIndicatorData(indicatorData1),
			arrangeIndicatorData(indicatorData2),
		],
	};
};

const arrangeIndicatorData = function (data) {
	const plot = data.reduce(
		(obj, elem) => {
			obj.years.push(elem.date);
			obj.value.push(elem.value);
			return obj;
		},
		{ years: [], value: [] },
	);

	plot.indicator = data[0].indicator.value;
	plot.country = data[0].country.value;

	return plot;
};

const getIndicatorData = function () {
	return [
		createIndicator("SP.POP.TOTL.FE.ZS", "Female Population %"),
		createIndicator("SP.ADO.TFRT", "Adolescent fetility rate %"),
		createIndicator("SE.ADT.LITR.FE.ZS", "Adult female literacy rate %"),
		createIndicator(
			"SL.TLF.0714.WK.FE.TM",
			"Average working hours of girls per week, ages 7-14",
		),
		createIndicator("SP.DYN.CBRT.IN", "Crude birth rate (per 1000 people)"),
		createIndicator(
			"SP.DYN.LE00.FE.IN",
			"Female Life expectancy at birth (years)",
		),
	];
};

const createIndicator = function (code, indicatorName) {
	return { seriescode: code, indicatorname: indicatorName };
};

// function getIndicatorsData() {
// 	return [
// 		"SL.TLF.0714.FE.ZS",
// 		"SP.DYN.CONU.ZS",
// 		"SL.FAM.WORK.FE.ZS",
// 		"SL.AGR.EMPL.FE.ZS",
// 		"SL.IND.EMPL.FE.ZS",
// 		"SL.SRV.EMPL.FE.ZS",
// 		"SL.EMP.TOTL.SP.FE.NE.ZS",
// 		"SL.EMP.1524.SP.FE.NE.ZS",
// 		"SP.HOU.FEMA.ZS",
// 		"SG.GEN.LSOM.ZS",
// 		"SP.DYN.TFRT.IN",
// 		"IC.FRM.FEMO.ZS",
// 		"IC.FRM.FEMM.ZS",
// 		"SE.PRE.ENRR.FE",
// 		"SE.PRM.ENRR.FE",
// 		"SE.SEC.ENRR.FE",
// 		"SE.TER.ENRR.FE",
// 		"SL.TLF.ACTI.1524.FE.NE.ZS",
// 		"SL.TLF.CACT.FE.NE.ZS",
// 		"SL.TLF.PRIM.FE.ZS",
// 		"SL.TLF.SECO.FE.ZS",
// 		"SL.TLF.TERT.FE.ZS",
// 		"SL.TLF.TOTL.FE.ZS",
// 	];
// }
module.exports = {
	getAllIndicators,
	getSingleIndicatorData,
	getCountryComparisionIndicatorData,
};
