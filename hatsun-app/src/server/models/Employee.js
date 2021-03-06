const mongoose  = require('mongoose');
const Schema =  mongoose.Schema

const employeeSchema = new Schema({
    UserID: 
    {
        type: String
    },
    CustomerName: 
    {
        type: String
    },
    CustomerID: 
    {
        type: String
    },
    UserName: 
    {
        type: String
    },
    UserEmail:
    {
        type: String
    },
    UserMobile:
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
    Location: 
    {
        type: String
    },
    AccessRoleName: 
    {
        type: String
    },
    CMaccess: 
    {
        type: String
    },
    Password: 
    {
        type: String
    },
    RoleID: 
    {
        type: String
    },
    isActive: 
    {
        type: Boolean
    },
    SecurityCode: 
    {
        type: String
    },
    PasswordResetedOn:
    {
        type: String
    },
    TokenNo: 
    {
        type: String
    }
    
},)

const Employee = mongoose.model('Employee', employeeSchema)
module.exports = Employee