import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/constant/spinner';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/constant/BackButton';
import TicketsItems from '../components/TicketsItems';

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
          <div className='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-grey-500 to-transparent opacity-75'></div>

          <span className='relative z-10 h1-bold bg-white px-6'>Ticket</span>
        </span>
        <div className='grid grid-cols-1 gap-4 mt-5'>
          {tickets.length === 0 ? (
            <h1 className='text-center'>No tickets to display</h1>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y-2 divide-white bg-white p-semibold-14 dark:divide-white dark:bg-bluey-500'>
                <thead className='ltr:text-left rtl:text-right p-semibold-1'>
                  <tr>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-white'>
                      Date
                    </th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-white'>
                      Products
                    </th>
                   
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-white'>
                      Status
                    </th>
                    <th className='px-4 py-2'></th>
                  </tr>
                </thead>
                <tbody className='divide-y-2  divide-white dark:divide-white text-center'>
                  {tickets.map((ticket) => (
                    <TicketsItems key={ticket._id} ticket={ticket} />
                  ))}
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
