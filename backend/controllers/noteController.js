const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Note = require('../models/noteModel');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');



// Description: Get a new note
// Route: GET /api/tickets/:ticketId/notes
// Access: Private

const getNotes = asyncHandler(async (req, res) => {
  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Retrieve tickets belonging to the user
  const notes = await Note.find({ user: req.user.id });

  // Return success response with a message
  res.status(200).json(tickets);
});

// // Description: Get a single ticket
// // Route: GET /api/tickets/:id
// // Access: Private
// const getSingleTickets = asyncHandler(async (req, res) => {
//   // Retrieve user using the ID and JWT
//   const user = await User.findById(req.user.id);

//   // Check if user exists
//   if (!user) {
//     res.status(401);
//     throw new Error('User not found');
//   }


module.exports = {
getNotes
};