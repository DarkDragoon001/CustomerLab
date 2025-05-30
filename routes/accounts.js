const express = require('express');
const { createAccount, getAccounts, deleteAccount } = require('../controllers/accountController');
const router = express.Router();

router.post('/', createAccount);
router.get('/', getAccounts);
router.delete('/:id', deleteAccount);

module.exports = router;