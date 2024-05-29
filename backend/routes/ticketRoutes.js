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


// to re-route into note router
const noteRouter= require("./noteRoutes")
router.use("/:ticketId/notes",noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTickets);


//for single id
router
  .route('/:id')
  .get(protect, getSingleTickets)
  .delete(protect, deleteTickets)
  .put(protect, updateTickets);

module.exports = router;
