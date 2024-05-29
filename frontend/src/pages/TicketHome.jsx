import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/constant/spinner';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import BackButton from '../components/constant/BackButton';
import TicketsItems from './TicketsItems';

const TicketHome = () => {
  
  const { tickets, isSuccess, isLoading } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  console.log({ tickets });
  // Show spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />

      <div className='wrapper'>
        <span className='relative flex justify-center'>
          <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75'></div>

          <span className='relative z-10 h1-bold bg-white  px-6'>Ticket</span>
        </span>
        <div className='grid grid-cols-1 gap-4 mt-5'>
          {tickets.length === 0 ? (
            <h1 className='text-center'>No tickets to display</h1>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700 bg-white text-sm'>
                <thead className='ltr:text-left rtl:text-right'>
                  <tr>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
                      Date
                    </th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
                      Products
                    </th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
                      Status
                    </th>
                    <th className='px-4 py-2'></th>
                  </tr>
                </thead>
                <tbody className='divide-y-2 text-center divide-gray-200 dark:divide-gray-700'>
                  {!Array.isArray(tickets)? (
                    <h1 className='text-center'>No tickets to display</h1>
                  ) : (
                    tickets.map((ticket) => (
                      <TicketsItems key={ticket._id} ticket={ticket} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default TicketHome;
