const RoleMaster = require('../models/rolemaster')

// list of employee
const index = (req, res, next) => {
    RoleMaster.find()
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
    let rolemasterID = req.body.rolemasterID
    RoleMaster.findById(rolemasterID)
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
    let rolemaster = new RoleMaster({
        RoleID: req.body.RoleID,
        RoleName: req.body.RoleName,
        Description: req.body.Description,
        DealerID: req.body.DealerID,
        AccessIDs: req.body.AccessIDs,
        RegionIDs: req.body.RegionIDs,
        SubRegion1IDs: req.body.SubRegion1IDs,
        SubRegion2IDs: req.body.SubRegion2IDs,
        WhenEntered: req.body.WhenEntered,
        WhenModified: req.body.WhenModified,
        IsActive: req.body.IsActive,
        BEID: req.body.BEID,
        CustomerID: req.body.CustomerID
        
    })
    rolemaster.save()
        .then(response => {
            res.json({
                message: 'RoleMaster added successfully!'
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
    let rolemasterID = req.body.rolemasterID

    let updatedData = {
        RoleID: req.body.RoleID,
        RoleName: req.body.RoleName,
        Description: req.body.Description,
        DealerID: req.body.DealerID,
        AccessIDs: req.body.AccessIDs,
        RegionIDs: req.body.RegionIDs,
        SubRegion1IDs: req.body.SubRegion1IDs,
        SubRegion2IDs: req.body.SubRegion2IDs,
        WhenEntered: req.body.WhenEntered,
        WhenModified: req.body.WhenModified,
        IsActive: req.body.IsActive,
        BEID: req.body.BEID,
        IsGobal:req.body.IsGobal,
        CustomerID: req.body.CustomerID

    }

    RoleMaster.findByIdAndUpdate(rolemasterID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Employee Updated!'
            })
        })
        .catch(error => {
            message: 'Error Updating Fields'
        })
}

//delete an employee

const destroy = (req, res, next) => {
    let rolemasterID = req.body.rolemasterID
    RoleMaster.findByIdAndRemove(rolemasterID)
        .then(() => {
            res.json({
                message: 'Employee deleted!'
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