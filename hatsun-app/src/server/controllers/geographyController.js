const geographyMaster = require('../models/geography')

// list of Countries
const indexOfCountry = (req, res, next) => {
    geographyMaster.CountryMaster.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occoured'
            })
        })
}

// list of States
const indexOfState = (req, res, next) => {
    let CountryId = req.body.CountryId;
    geographyMaster.StateMaster.find({ "CountryID": CountryId })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occoured'
            })
        })
}

// list of Cities
const indexOfCity = (req, res, next) => {
    let RegionCode = req.body.RegionCode;
    geographyMaster.CityMaster.find({ "RegionCode": RegionCode })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occoured'
            })
        })
}

module.exports = {
    indexOfCountry, indexOfState, indexOfCity
}