const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const CountryMasterSchema = new Schema({});
const StateMasterSchema = new Schema({});
const CityMasterSchema = new Schema({});

const CountryMaster = mongoose.model('CountryMaster', CountryMasterSchema, "CountryMaster");
const StateMaster = mongoose.model('StateMaster', StateMasterSchema, "StateMaster");
const CityMaster = mongoose.model('CityMaster', CityMasterSchema, "CityMaster");

module.exports = {
    CountryMaster: CountryMaster,
    StateMaster: StateMaster,
    CityMaster: CityMaster
}