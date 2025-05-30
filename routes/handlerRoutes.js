const express = require('express');
const { receiveData } = require('../controllers/incomingDataController');
const router = express.Router();

router.post('/incoming_data', receiveData);

module.exports = router;
