const User = require('../models/User');

// @desc Get all users
// @route GET /api/v1/users
// @access Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc Get a single user
// @route GET /api/v1/user/:id 
exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}

// @desc Add an user
// @route POST /api/v1/
exports.addUser = async (req, res, next) => {
  try {
    const { username, email, contact, balance } = req.body;
    //const user = await User.findOne({ username: username });
    const newUser = await User.create(req.body);
    return res.status(201).json({
      success: true,
      data: newUser
    })
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      console.log(messages);
      return res.status(400).json({
        success: false,
        error: messages
      })
    } 
    else if (err.code === 11000 && 'username' in err.keyPattern) {
      console.log(err);
      return res.status(400).json({
        success: false,
        error: 'Username is already taken'
      })
    }
    else if (err.code === 11000 && 'email' in err.keyPattern) {
      return res.status(400).json({
        success: false,
        error: 'Email is already in use'
      })
    }
    else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};