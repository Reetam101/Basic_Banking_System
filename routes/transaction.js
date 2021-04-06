const express = require('express');
const router = express.Router();

const { getTransactions, addTransaction } = require('../controllers/transactionController');

router
  .route('/transactions')
  .get(getTransactions);

router.route('/makeTransaction').post(addTransaction);

module.exports = router;