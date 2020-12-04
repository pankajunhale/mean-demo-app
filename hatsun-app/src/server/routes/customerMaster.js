const express = require('express')

const router = express.Router()

const controller = require('../controllers/customermasterController');

router.post('/', controller.index)
router.get('/customerAutocomplete', controller.customerAutocomplete)
router.post('/show', controller.show)
router.post('/store', controller.store)
router.post('/update', controller.update)
router.post('/delete', controller.destroy)



module.exports = router