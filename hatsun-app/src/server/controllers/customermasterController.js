const CustomerMaster = require('../models/Customermaster')
var mongoose = require('mongoose');

// list of employee
const index = (req, res, next) => {
    var matchObj = {
        "_id": (req.body.CustomerID != "" && req.body.CustomerID != undefined ) ? mongoose.Types.ObjectId(req.body.CustomerID) : "",
        "Country.CountryCode": req.body.Country,
        "State.Region_Code": req.body.State,
        "City.CityCode": req.body.Distrcit,
        "IsActive": req.body.IsActive
    }
    for (var name in matchObj) {
        if(matchObj[name] == ""){
            delete matchObj[name];
        }
     }
    var stages = [
        { $lookup : { from: "CountryMaster", localField: "Country", foreignField: "CountryCode", as : "Country"} },
        { $unwind: "$Country" },
        { $lookup : { from: "StateMaster", localField: "State", foreignField: "Region_Code", as : "State"} },
        { $unwind: "$State" },
        { $lookup : { from: "CityMaster", localField: "District", foreignField: "CityCode", as : "City" } },
        { $unwind: "$City" }
    ]
    if(Object.keys(matchObj).length != 0) {
        stages.push({ $match: matchObj })
    }
    CustomerMaster.aggregate(stages)
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

// customer dropdown
const customerAutocomplete = (req, res, next) => {
    CustomerMaster.aggregate([
        { $project : { "CustomerName":1 } }
    ])
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
    index, show, store, update, destroy, customerAutocomplete
}