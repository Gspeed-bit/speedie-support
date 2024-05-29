import axios from 'axios';

const API_URL = '/api/tickets/';

const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, ticketData, config);

  return response.data;
};

// get user ticket
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};
// get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + ticketId, config);

  return response.data;
};
// update ticket status
const updateTicketStatus = async (ticketId, token, newStatus) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + ticketId,
    { status: newStatus }, // Use the provided newStatus parameter
    config
  );
  return response.data;
};

// close ticket status
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'Closed' },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  updateTicketStatus,
  closeTicket,
};

export default ticketService;
