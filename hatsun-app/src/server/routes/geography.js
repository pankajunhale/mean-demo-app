const express = require('express')

const router = express.Router()

const controller = require('../controllers/geographyController');

router.get('/Country', controller.indexOfCountry)
router.post('/State', controller.indexOfState)
router.post('/City', controller.indexOfCity)

module.exports = router