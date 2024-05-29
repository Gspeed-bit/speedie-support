import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/constant/spinner';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../components/constant/BackButton';

const NewTicket = () => {
  // Get user details from the auth state
  const { user } = useSelector((state) => state.auth);
  // Get the ticket-related states
  const { isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );

  // Local state to manage the form inputs
  const [showSpinner, setShowSpinner] = useState(false);
  const [name] = useState(`${user.firstName} ${user.lastName}`);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const ticketData = {
      product,
      description,
      priority: priority, // Ensure priority is correctly captured
    };
    dispatch(createTicket(ticketData));
  };

  // Handle side effects based on ticket state changes
  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        dispatch(reset());
        navigate('/tickets');
        toast.success('New Ticket created');
      }, 2000); // Show spinner for 2 seconds before navigating
    }
  }, [navigate, isSuccess, isLoading, isError, message, dispatch]);

  // Product options for the select dropdown
  const productOptions = [
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

  // Show spinner while loading
  if (showSpinner) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <div className='wrapper'>
        <section className='flex-col'>
          <div className='text-center'>
            <h1 className='h1-bold text-bluey-400'>Create New Ticket</h1>
            <h3 className='h5-bold text-grey-200'>
              Please fill out the form below
            </h3>
          </div>
          <section className='space-y-4 max-w-2xl md:p-medium-18 p-medium-16 px-15 mx-auto'>
            <div className='flex flex-col mt-10 space-y-2'>
              <label htmlFor='name' className='p-medium-16 md:p-medium-18'>
                Customer Name
              </label>
              <input
                type='text'
                id='name'
                value={name}
                className='border p-2 rounded-lg'
                disabled
              />
            </div>
            <div className='flex flex-col mt-10 space-y-2'>
              <label htmlFor='email' className='p-semibold-16 md:p-semibold-18'>
                Customer Email
              </label>
              <input
                type='text'
                id='email'
                value={email}
                className='border p-2 rounded-lg'
                disabled
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className='space-y-3'>
                <label className='pt-2'>Products:</label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className='p-medium-14 border flex w-full flex-col p-3 rounded-lg'
                >
                  <option value=''>Select Product</option>
                  {productOptions.map((product, index) => (
                    <option key={index} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div className='space-y-3 pt-3'>
                <label>Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className='p-medium-14 border flex w-full flex-col p-3 rounded-lg'
                >
                  <option value=''>Select Priority</option>
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              </div>
              <div className='pt-3 space-y-2'>
                <label>Description of the issue</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='p-medium-14 border flex w-full flex-col p-4 rounded-lg'
                  placeholder='Description'
                />
              </div>
              <button
                type='submit'
                className='bg-bluey-300 mt-5 w-full rounded-lg p-2'
              >
                Submit
              </button>
            </form>
          </section>
        </section>
      </div>
    </>
  );
};

export default NewTicket;
