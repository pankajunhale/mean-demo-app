const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
    RoleID:
    {
        type: String
    },
    RoleName:
    {
        type: String
    },
    Description:
    {
        type: String
    },
    DealerID:
    {
        type: String
    },
    AccessIDs:
    {
        type:String
    },
    RegionIDs:
    {
        type:String
    },
    SubRegion1IDs:
    {
        type:String
    },
    SubRegion2IDs:
    {
        type:String
    },
    WhenEntered:
    {
        type: String
    },
    WhenModified:
    {
        type:String
    },
    IsActive:
    {
        type:Boolean
    },
    BEID:
    {
        type:String
    },
    IsGobal:
    {
        type:Boolean
    },
    CustomerID:
    {
        type:String
    }
})

const RoleMaster = mongoose.model('RoleMaster', schema)
module.exports = RoleMaster