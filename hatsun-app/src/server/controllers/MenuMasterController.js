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
    MenuMaster.MenuModuleMaster.find({ "MenuGroupId" : MenuGroupId })
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
    MenuMaster.AccessModuleMaster.find({ "ParentId" : MenuModuleId })
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

module.exports = {
    index, show, showAccessModule
}