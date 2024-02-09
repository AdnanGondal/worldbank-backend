const fetch = require("node-fetch")
const config = require("../../config");

const getAllCountries = async function () {


try {
    const response = await fetch(config.world_bank_api.getAllCountries);
    const countriesData = await response.json()

    return countriesData[1].map(country => {
        return {shortcode: country.id, shortname: country.name}
        })

} catch {
    console.log("Error getting countries data from API, returning bacckup countries")
    return getBackupCountries();
}
   
       
   
};

const getBackupCountries = function (){
    return [createCountry("IND","India"), createCountry("GHA", "Ghana"), createCountry("CHE", "Swithzerland")]
}

const createCountry = function(countryCode, countryName){
    return {shortcode: countryCode, shortname: countryName};
}


module.exports = {
	getAllCountries
};