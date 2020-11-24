const express = require('express')

const router = express.Router()

const controller = require('../controllers/MenuMasterController');

router.get('/', controller.index)
router.post('/show', controller.show)
router.post('/showAcessModule', controller.showAccessModule)
router.get('/showMenuSetup', controller.showMenuSetup)
router.get('/showMenuSetupList', controller.showMenuSetupList)
router.post('/updateMenuSetup', controller.updateMenuSetup)

module.exports = router