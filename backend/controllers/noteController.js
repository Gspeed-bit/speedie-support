const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Note = require('../models/noteModel');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Description: Get note for a ticket
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
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User Not Authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });
  // Return success response with a message
  res.status(200).json(notes);
});

// Description: Create a ticket note 
// Route: POST /api/tickets/:ticketId/notes
// Access: Private

const addNote = asyncHandler(async (req, res) => {
  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Retrieve tickets belonging to the user
  const ticket = await Ticket.findById(req.params.ticketId);
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User Not Authorized');
  }

 
  const note = await Note.create({
    text:req.body.text,
    ticket:req.params.ticketId,
    user: req.user.id,
    isStaff:req.body.isStaff
  });
  res.status(201).json(note);
});


module.exports = {
  getNotes,
  addNote
};
