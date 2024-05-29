import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
  getTicket,
  updateTicketStatus,
  closeTicket,
} from '../features/tickets/ticketSlice';

import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/constant/BackButton';
import {
  getNotes,
  createNote,
} from '../features/notes/noteSlice';
import NewNote from './NewNote';
import Modal from 'react-modal'; // Import Modal from react-modal

import { IoAddCircleOutline } from 'react-icons/io5';
import Spinner from '../components/constant/spinner';

const SingleTicket = () => {
  Modal.setAppElement('#root');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [statusChanging, setStatusChanging] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message || 'An error occurred');
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, dispatch, ticketId]);

  const handleStatusChange = () => {
    setStatusChanging(true);
    const newStatus = 'In Progress';
    dispatch(updateTicketStatus({ ticketId, newStatus }))
      .then(() => {
        dispatch(getTicket(ticketId));
      })
      .catch((error) => {
        setStatusChanging(false);
        toast.error(error.message || 'Failed to change status');
      })
      .finally(() => {
        setStatusChanging(false);
      });
  };

  const handleCloseTicket = () => {
    dispatch(closeTicket({ ticketId, status: 'Closed' }))
      .then(() => {
        toast.success('Ticket Closed');
        navigate('/tickets');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to close ticket');
      })
      .finally(() => {
        setStatusChanging(false);
      });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    setNoteText('');
    handleCloseModal();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/tickets' />
      <div className='wrapper'>
        <section className=''>
          <div className='flex-sm border-2 p-2 rounded-lg border-blue-600 md:flex-row md:flex-between gap-1'>
            <div className='pb-4 '>
              <div className=''>
                <span className='p-medium-16 text-bluey-400'>
                  Data submitted:
                </span>
                <span className='p-medium-14'>
                  {new Date(ticket.createdAt).toLocaleString('de-DE', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h1 className='pt-1'>
                <span className='p-medium-16 text-bluey-400'>Ticket ID:</span>
                <span className='p-medium-14'> {ticket._id}</span>
              </h1>
              <h2 className='pt-1'>
                <span className='p-medium-16 text-bluey-400'>Product:</span>
                <span className='p-medium-14'> {ticket.product}</span>
              </h2>
            </div>
            <div className='flex flex-col md:flex-row gap-3 md:gap-2'>
              <button
                className={`inline-block capitalize rounded px-6 py-2 text-xs p-semibold-14 md:p-semibold-16 text-white cursor-default ${
                  ticket.status === 'New'
                    ? 'bg-orange-500'
                    : ticket.status === 'Open'
                    ? 'bg-green-500 '
                    : ticket.status === 'In Progress'
                    ? 'bg-purple-500'
                    : ticket.status === 'Closed'
                    ? 'bg-red-500 '
                    : ''
                }`}
              >
                {ticket.status}
              </button>
              {(ticket.status === 'New' || ticket.status === 'Open') &&
                !statusChanging && (
                  <button
                    onClick={handleStatusChange}
                    className='bg-bluey-400 hover:bg-bluey-300 p-medium-14 md:p-medium-16 text-white rounded px-2 py-2'
                  >
                    {ticket.status === 'New'
                      ? 'Start Working'
                      : 'Resume Working'}
                  </button>
                )}
            </div>
          </div>

          <div className='pt-1 mt-4 bg-grey-100 p-5 rounded-xl relative'>
            <span
              className={`inline-block capitalize absolute top-0 right-0 rounded-tr-xl px-6 py-2 text-xs p-semibold-14 text-white ${
                ticket.priority === 'Low'
                  ? 'bg-yellow-400'
                  : ticket.priority === 'Medium'
                  ? 'bg-green-500'
                  : ticket.priority === 'High'
                  ? 'bg-red-500'
                  : ''
              }`}
            >
              {ticket.priority}
            </span>
            <div className='py-8'>
              <span className='p-medium-18 text-bluey-400'>Description:</span>
              <p
                className={`text-justify p-regular-14 md:p-regular-16 pt-2 ${
                  ticket.status === 'Closed' ? 'line-through' : ''
                }`}
              >
                {ticket.description}
              </p>
            </div>
          </div>
        </section>
        <div className='mt-2'>
          {ticket.status !== 'Closed' ? (
            <div>
              <h1 className='p-semibold-20 text-bluey-400 py-3'>Chat</h1>
              <button
                onClick={handleOpenModal}
                className='bg-bluey-400 p-medium-14 md:p-medium-16 text-white rounded px-2 py-2 mb-4'
              >
                <p className='flex gap-2 flex-center'>
                  <IoAddCircleOutline />
                  <span>Add Note</span>
                </p>
              </button>
            </div>
          ) : null}
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel='Add Note Modal'
          overlayClassName='overlay'
          className='flex flex-center min-h-screen'
        >
          <form onSubmit={handleAddNote}>
            <div className='md:min-w-[600px] min-w-[400px] bg-white rounded-lg p-6'>
              <div className='flex justify-end'>
                <IoCloseCircleOutline
                  onClick={handleCloseModal}
                  className='text-bluey-400 text-3xl cursor-pointer'
                />
              </div>
              <h2 className='text-bluey-400 p-semibold-20 md:h5-bold mb-4'>
                Add a New Note
              </h2>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows='2'
                name='noteText'
                placeholder='Enter your note here...'
                className='w-full border border-gray-300 rounded-md p-2 mb-4'
              ></textarea>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded-md mr-2'
                >
                  Add Note
                </button>
                <button
                  onClick={handleCloseModal}
                  type='button'
                  className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md'
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Modal>
        <div>
          {notesIsLoading ? (
            <Spinner />
          ) : (
            <div className='flex flex-col gap-3'>
              {ticket.status !== 'Closed' &&
                notes.map((note) => (
                  <NewNote note={note} ticket={ticket} key={note._id} />
                ))}
            </div>
          )}
        </div>

        <div className='pt-5 flex gap-3'>
          {ticket.status !== 'Closed' && (
            <button
              onClick={handleCloseTicket}
              className='w-full bg-red-500 p-medium-14 md:p-medium-16 text-white rounded px-2 py-2'
            >
              Close Ticket
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleTicket;
