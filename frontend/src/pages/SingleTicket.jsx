import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/constant/spinner';
import { getTicket } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import BackButton from '../components/constant/BackButton';

const SingleTicket = () => {
  // eslint-disable-next-line
  const { ticket, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const [showSpinner, setShowSpinner] = useState(false);
  // eslint-disable-next-line
  const params = useParams();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [isError, message, dispatch, ticketId]);

  if (isError) {
    toast.error('error occur');
  }

  if (showSpinner) {
    <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <div className='wrapper'>
        <section className=''>
          <div className='flex-between'>
            <div>
              <p className=''>
                <span className='p-medium-18'> Data submitted: </span>
                {new Date(ticket.createdAt).toLocaleString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>

              <h1 className='pt-1'>
                <span className='p-medium-18'>Ticket ID: </span>
                {ticket._id}
              </h1>
            </div>
            <button
              className={`inline-block capitalize rounded px-4 py-2 text-xs font-medium text-white ${
                ticket.status=== 'New'
                  ? 'bg-orange-500'
                  : ticket.status === 'Open'
                  ? 'bg-green-500 '
                  : ticket.status === 'In progress'
                  ? 'bg-purple-500'
                  : ticket.status === 'Closed'
                  ? 'bg-gray-500 '
                  : ''
              }`}
            >
              {ticket.status}
            </button>
          </div>
          <h2 className='pt-1'>
            <span className='p-medium-18'>Product:</span> {ticket.product}
          </h2>
          <div>
            <p>Description: {ticket.description}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleTicket;
