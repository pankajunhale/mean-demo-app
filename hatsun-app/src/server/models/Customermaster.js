const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const schema = new Schema({
    CustomerID:
    {
        type: String
    },
    CustomerName:
    {
        type: String
    },
    Address:
    {
        type: String
    },
    Country:
    {
        type: String
    },
    State:
    {
        type: String
    },
    District:
    {
        type: String
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
        type: String,
        unique : true
    },
    Mobile:
    {
        type: String
    },
    IsActive:
    {
        type: Boolean
    }
})
schema.plugin(uniqueValidator);

const CustomerMaster = mongoose.model('CustomerMaster', schema)
module.exports = CustomerMaster