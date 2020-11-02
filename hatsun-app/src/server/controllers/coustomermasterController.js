const CoustomerMaster = require('../models/Coustomermaster')

// list of employee
const index = (req, res, next) => {
    CoustomerMaster.find()
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
    let coustomerID = req.body.coustomerID
    CoustomerMaster.findById(coustomerID)
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
    let coustomermaster = new CoustomerMaster({
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
    coustomermaster.save()
        .then(response => {
            res.json({
                message: 'Coustomer added successfully!'
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
    let coustomermasterID = req.body.coustomermasterID

    let updatedData = {
        CustomerID: req.body.CustomerID,
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
    }

    CoustomerMaster.findByIdAndUpdate(coustomermasterID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Coustomer Updated!'
            })
        })
        .catch(error => {
            message: 'Error Updating Fields'
        })
}

//delete an employee

const destroy = (req, res, next) => {
    let coustomermasterID = req.body.coustomermasterID
    CoustomerMaster.findByIdAndRemove(coustomermasterID)
        .then(() => {
            res.json({
                message: 'Coustomer deleted!'
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