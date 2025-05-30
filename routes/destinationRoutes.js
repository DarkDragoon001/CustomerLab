const express = require('express');
const { createDestination, getDestinationsByAccount } = require('../controllers/destinationRoutes');
const router = express.Router();

router.post('/', createDestination);
router.get('/account/:id', getDestinationsByAccount);


module.exports = router;