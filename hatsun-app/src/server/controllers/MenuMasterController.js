const MenuMaster = require('../models/MenuMaster')

// list of MenuGroupMaster
const index = (req, res, next) => {
    MenuMaster.MenuMaster.find()
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

// show MenuModule
const show = (req, res, next) => {
    let MenuGroupId = req.body.MenuGroupId
    MenuMaster.MenuModuleMaster.find({ "MenuGroupId": MenuGroupId })
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

// show AccessModuleMaster
const showAccessModule = (req, res, next) => {
    let MenuModuleId = req.body.MenuModuleId
    MenuMaster.AccessModuleMaster.find({ "ParentId": MenuModuleId })
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

// show MenuSetup
const showMenuSetup = (req, res, next) => {
    MenuMaster.MenuSetupMaster.aggregate([
        { $match : { "MenuModule.AccessModule.Roles" : "5faa8d19d02f7f350cf7ef95" } }
    ])
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

// show MenuSetupList
const showMenuSetupList = (req, res, next) => {
    MenuMaster.MenuSetupList.find()
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

// update MenuSetup
const updateMenuSetup = (req, res) => {
    let data = req.body.menuSetupData.AccessMenus;
    for(let i=0; i<data.length; i++) {
        MenuMaster.MenuSetupUpdate.update(
            {},
            { $set: { "MenuModule.$[].AccessModule.$[exp].Roles": data[i].Roles } },
            { arrayFilters: [  { "exp.AccessModuleName": data[i].AccessModuleName } ], multi: true}
         ).then(response => {
            res.json({
                message: 'updated successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An ERROR occoured!'
            })
        })
    }
}

module.exports = {
    index, show, showAccessModule, showMenuSetup, showMenuSetupList, updateMenuSetup
}