const CustomerMaster = require('../models/Customermaster')

// list of employee
const index = (req, res, next) => {
    CustomerMaster.find()
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

// show single employee
const show = (req, res, next) => {
    let customermasterID = req.body.customermasterID
    CustomerMaster.findById(customermasterID)
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
const store = (req, res, next) => {
    let customermaster = new CustomerMaster({
        CustomerID : req.body.CustomerID,
        CustomerName: req.body.CustomerName,
        Address: req.body.Address,
        Country: req.body.Country,
        State: req.body.State,
        District: req.body.District,
        PinCode: req.body.PinCode,
        Contact: req.body.Contact,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
        WhenEntered: req.body.WhenEntered,
        WhenModified: req.body.WhenModified,
        IsActive: req.body.IsActive

    })
    customermaster.save()
        .then(response => {
            res.json({
                message: 'Customer added successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An ERROR occoured!'
            })
        })
}

// update an empoyee

const update = (req, res, next) => {
    let customermasterID = req.body.customermasterID

    let updatedData = {
        CustomerID: req.body.customerData.CustomerID,
        CustomerName: req.body.customerData.CustomerName,
        Address: req.body.customerData.Address,
        Country: req.body.customerData.Country,
        State: req.body.customerData.State,
        District: req.body.customerData.District,
        PinCode: req.body.customerData.PinCode,
        Contact: req.body.customerData.Contact,
        Email: req.body.customerData.Email,
        Mobile: req.body.customerData.Mobile,
        WhenEntered: req.body.customerData.WhenEntered,
        WhenModified: req.body.customerData.WhenModified,
        IsActive: req.body.customerData.IsActive
    }

    CustomerMaster.findByIdAndUpdate(customermasterID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Customer Updated!'
            })
        })
        .catch(error => {
            message: 'Error Updating Fields'
        })
}

//delete an employee

const destroy = (req, res, next) => {
    let customermasterID = req.body.customermasterID
    CustomerMaster.findByIdAndRemove(customermasterID)
        .then(() => {
            res.json({
                message: 'Customer deleted!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occoured Deleting!'
            })
        })
}

module.exports = {
    index, show, store, update, destroy
}