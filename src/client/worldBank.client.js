const fetch = require("node-fetch")
const config = require("../../config");

const getAllCountries = async function () {

    const response = await fetch(config.world_bank_api.getAllCountries);
    const countriesData = await response.json()

    console.log("Received Countries Data: "+ countriesData[0])

    return countriesData[1].map(country => {
        console.log(country.id)
        console.log(country.name)
        return {shortcode: country.id, shortname: country.name}
        })


};



module.exports = {
	getAllCountries
};