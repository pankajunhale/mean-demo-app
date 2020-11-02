const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Coustomerschema = new Schema({
    CustomerID:
    {
        type: String
    },
    CoustomerName:
    {
        type: String
    },
    Address:
    {
        type: String
    },
    Country:
    {
        type: Number
    },
    State:
    {
        type: Number
    },
    District:
    {
        type: Number
    },
    PinCode:
    {
        type: Number
    },
    Contact:
    {
        type: String
    },
    Email:
    {
        type: String
    },
    Mobile:
    {
        type: String
    },
    WhenEntered:
    {
        type: String
    },
    WhenModified:
    {
        type: String
    },
    IsActive:
    {
        type: Boolean
    }
})

const CoustomerMaster = mongoose.model('CoustomerMaster', Coustomerschema)
module.exports = CoustomerMaster