const express = require('express')

const router = express.Router()

const controller = require('../controllers/MenuMasterController');

router.get('/', controller.index)
router.post('/show', controller.show)
router.post('/showAcessModule', controller.showAccessModule)

module.exports = router