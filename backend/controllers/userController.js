const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
//@desc  Register a new user
//@route  /api/users/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //validation to is either name or email and password doesnt exist
  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  //check if user already exists because we dont want to reguster if use doesnt exist
  //since email is unique we use .findOne
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user in the db
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // if the user was created we return a 201 and convert to json
  if (user) {
    res.status(201).json({
      _id: user._id, //mongoose uses _id not id
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc  Login a user
//@route  /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //comparing the user password and the hashed payy
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

//@desc  get current user
//@route  /api/users/me
//@access private

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, getMe };
