const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getTickets,
  createTickets,
  getSingleTickets,
  deleteTickets,
  updateTickets,
} = require('../controllers/ticketController');



router.route('/').get(protect, getTickets).post(protect, createTickets);


//for single id
router
  .route('/:id')
  .get(protect, getSingleTickets)
  .delete(protect, deleteTickets)
  .put(protect, updateTickets);

module.exports = router;
