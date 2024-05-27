const mongoose = require('mongoose');
const ProductEnum = [
  'Laptop',
  'Smartphone',
  'Tablet',
  'Desktop Computer',
  'Headphones',
  'Smartwatch',
  'Camera',
  'Gaming Console',
  'Router',
];

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    product: {
      type: String,
      enum: ProductEnum,
      required: [true, 'Please select a product'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter a description'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Open', 'In Progress', 'Closed'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
      required: [true, 'Please set the priority'],
    },
  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
