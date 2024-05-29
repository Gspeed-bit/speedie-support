const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const jwt = require('jsonwebtoken');

// Description: Get a new ticket
// Route: GET /api/tickets/
// Access: Private
const getTickets = asyncHandler(async (req, res) => {
  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Retrieve tickets belonging to the user
  const tickets = await Ticket.find({ user: req.user.id });

  // Return success response with a message
  res.status(200).json(tickets);
});

// Description: Get a single ticket
// Route: GET /api/tickets/:id
// Access: Private
const getSingleTickets = asyncHandler(async (req, res) => {
  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Retrieve tickets belonging to a single user
  const singleTickets = await Ticket.findById(req.params.id);
  //if no ticket if found

  if (!singleTickets) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (singleTickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Return success response with a message
  res.status(200).json(singleTickets);
});

// Description: Create a new ticket
// Route: POST /api/tickets/
// Access: Private

const createTickets = asyncHandler(async (req, res) => {
  const { product, description, priority } = req.body;
  if (!product || !description || !priority) {
    res.status(400);
    throw new Error('Please add a product,priority and description');
  }

  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'New',
    priority,
  });
  res.status(201).json(ticket);
});

// Description: DELETE a new ticket
// Route: DEL /api/tickets/:id
// Access: Private
const deleteTickets = asyncHandler(async (req, res) => {
  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Retrieve tickets belonging to a single user
  const tickets = await Ticket.findById(req.params.id);
  //if no ticket if found

  if (!tickets) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (tickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized to delete the ticket');
  }
  
  await Ticket.findOneAndDelete(req.params.id);
  // Return success response with a message
  res.status(200).json({
    success: true,
    message: 'Ticket deleted successfully',
  });
});

// Description: update a new ticket
// Route: put /api/tickets/:id
// Access: Private
const updateTickets = asyncHandler(async (req, res) => {
  const ticketId = req.params.id; // Assuming the ticket ID is passed as a parameter in the request
  const updateData = req.body; // Assuming the updated ticket data is sent in the request body

  // Retrieve user using the ID and JWT
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Retrieve tickets belonging to a single user
  const tickets = await Ticket.findById(req.params.id);
  //if no ticket if found

  if (!tickets) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (tickets.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized to delete the ticket');
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    ticketId,
    updateData,
    { new: true } // Return the updated ticket after the update operation
  );
  // Return success response with a message
  res.status(200).json(updatedTicket);
});
// Export the getTickets and createTickets functions
module.exports = {
  getTickets,
  createTickets,
  getSingleTickets,
  deleteTickets,
  updateTickets,
};
