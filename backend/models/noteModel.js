const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
