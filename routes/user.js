const express = require('express');
const router = express.Router();

const { getSingleUser } = require('../controllers/userController');

router.route('/:id')
  .get(getSingleUser);

module.exports = router;