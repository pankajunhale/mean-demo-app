const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
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

const CustomerMaster = mongoose.model('CustomerMaster', schema)
module.exports = CustomerMaster