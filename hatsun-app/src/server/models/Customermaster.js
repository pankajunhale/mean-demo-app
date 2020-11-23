const mongoose = require('mongoose');
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