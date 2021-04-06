const Transaction = require('../models/Transaction');
const User = require('../models/User');

// @desc Get all transactions
// @route GET api/v1/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
    .populate('from').populate('to').lean();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc Add a transaction
// @route POST api/v1/makeTransaction
exports.addTransaction = async (req, res, next) => {
  try {
    const { from, to, amount, message } = req.body;

    /* if(!await User.findOne({ username: from })) {
      console.log('The Sender does not exist in the bank db');
      return res.redirect('/makeTransaction');
    }
    if(!await User.findOne({ username: to })) {
      console.log('The Receiver does not exist in the bank db');
      return res.redirect('/makeTransaction');
    } */
    const sender = await User.findOne({ username: from });
    const receiver = await User.findOne({ username: to });
    const newTransaction = new Transaction({
      from: sender._id,
      to: receiver._id,
      amount: amount,
      message: message
    })

    const t = await newTransaction.save();
    const fromUser = await User.findOne({ username: from });
    const toUser = await User.findOne({ username: to });
    const filter = { username: from };
    const update = { balance: fromUser.balance - amount };
    await User.findOneAndUpdate(filter, update, { new: true, useFindAndModify: false });
    await User.findOneAndUpdate({ username: to }, { balance: toUser.balance + parseInt(amount) }, { new: true, useFindAndModify: false });

    fromUser.transactions.push(newTransaction);
    await fromUser.save();

    console.log('Saved');
    return res.status(201).json({
      success: true,
      data: t
    })

  } catch(err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      })
    }
    else if(err.name === 'TypeError' && err.message.includes("'_id'")) {
      console.log(err.message);
      return res.status(400).json({
        success: false,
        error: 'Username does not exist in database'
      })
    }
    else if (err.name === 'TypeError' && err.message.includes("'balance'")) {
      return res.status(400).json({
        success: false,
        error: 'Amount can not be 0'
      })
    }
    else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}