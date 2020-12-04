const express = require('express')

const router = express.Router()

const controller = require('../controllers/rolemasterController');

router.post('/', controller.index)
router.get('/roleDropdown', controller.roleDropdown)
router.post('/show', controller.show)
router.post('/store', controller.store)
router.post('/update', controller.update)
router.post('/delete', controller.destroy)



module.exports = router