const Employee = require('../models/Employee')

// list of employee
const index  = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message:'An error occoured'
        })
    })
}

// show single employee
const show = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occoured!'
        })
    })
}

// storing to database
const store = (req,res,next) => {
    debugger;
    let employee = new Employee({
    UserID: req.body.UserID,
    CustomerName: req.body.CustomerName,
    CustomerID : req.body.CustomerID,
    UserName: req.body.UserName,
    UserEmail: req.body.UserEmail,
    UserMobile: req.body.UserMobile,
    Country: req.body.Country,
    State: req.body.State,
    District: req.body.District,
    Location: req.body.Location,
    AccessRoleName: req.body.AccessRoleName,
    CMaccess: req.body.CMaccess,
    Password: req.body.Password,
    RoleID: req.body.RoleID,
    isActive: req.body.isActive,
    SecurityCode: req.body.SecurityCode,
    PasswordResetedOn: req.body.PasswordResetedOn,
    TokenNo: req.body.TokenNo
    })
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee added successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An ERROR occoured!'
        })
    })
}

// update an empoyee

const update = (req,res,next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        UserID: req.body.UserID,
        CustomerName: req.body.CustomerName,
        CustomerID: req.body.CustomerID,
        UserName: req.body.UserName,
        UserEmail: req.body.UserEmail,
        UserEmail: req.body.UserEmail,
        UserMobile: req.body.UserMobile,
        Country: req.body.Country,
        State: req.body.State,
        District: req.body.District,
        Location: req.body.Location,
        AccessRoleName: req.body.AccessRoleName,
        CMaccess: req.body.CMaccess,
        Password: req.body.Password,
        RoleID: req.body.RoleID,
        isActive: req.body.isActive,
        SecurityCode: req.body.SecurityCode,
        PasswordResetedOn: req.body.PasswordResetedOn,
        TokenNo: req.body.TokenNo
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message:'Employee Updated!'
        })
    })
    .catch(error => {
        message:'Error Updating Fields'
    })
}

//delete an employee

const destroy = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message:'Employee deleted!'
        })
    })
    .catch(error => {
        res.json({
            message:'Error Occoured Deleting!'
        })
    })
}

module.exports = {
    index,show,store,update,destroy
}