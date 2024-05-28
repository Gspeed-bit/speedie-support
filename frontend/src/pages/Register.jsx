import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/constant/spinner';

const Register = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showSpinner, setShowSpinner] = useState(false);

  const { firstName, lastName, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }

    if (isError) {
      toast.error(message);
    }

    //redirect to homepage
    if (isSuccess) {
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        navigate('/');
        toast.success('Welcome to Speedie');
        dispatch(reset());
      }, 2000); // Show spinner for 2 seconds before navigating
    }
  }, [user, navigate, isSuccess, isLoading, isError, message, dispatch]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password Not Matching!');
    } else {
      const userData = {
        firstName,
        lastName,
        email: email.toLowerCase(), // Convert email to lowercase,
        password,
      };
      dispatch(register(userData));
      setFormData(initialFormData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  if (showSpinner) {
    return <Spinner />;
  }
  return (
    <section className='bg-bluey-100'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        <aside className='relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6'>
          <img
            alt=''
            src='https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            className='absolute inset-0 h-full w-full object-cover'
          />
        </aside>

        <main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
          <div className='max-w-xl lg:max-w-3xl'>
            <h1 className='mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl'>
              Welcome to Speedie
            </h1>

            <p className='mt-4 leading-relaxed text-gray-500'>
              At Speedie Support, we are dedicated to providing you with the
              fastest and most reliable assistance. Our team is here to help you
              with any issues or questions you might have.
            </p>

            <form
              onSubmit={handleSubmit}
              action='#'
              className='mt-8 grid grid-cols-6 gap-6'
            >
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='FirstName'
                  className='block text-sm font-medium text-gray-700'
                >
                  First Name
                </label>

                <input
                  type='text'
                  id='FirstName'
                  placeholder='First Name'
                  name='firstName'
                  value={firstName}
                  onChange={handleChange}
                  className='mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
                />
              </div>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='LastName'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last Name
                </label>

                <input
                  type='text'
                  id='LastName'
                  placeholder='Last Name'
                  name='lastName'
                  value={lastName}
                  onChange={handleChange}
                  className='mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
                />
              </div>
              <div className='col-span-6'>
                <label
                  htmlFor='Email'
                  className='block text-sm font-medium text-gray-700'
                >
                  {' '}
                  Email{' '}
                </label>

                <input
                  type='email'
                  id='Email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  placeholder='Email'
                  className='mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
                />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='Password'
                  className='block text-sm font-medium text-gray-700'
                >
                  Password
                </label>

                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                    id='Password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    placeholder='Password'
                    className='mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
                    required
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility} // Toggle password visibility on button click
                    className='absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none'
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}{' '}
                    {/* Show/hide eye icons */}
                  </button>
                </div>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='PasswordConfirmation'
                  className='block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>

                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                    id='Password'
                    name='password2'
                    value={password2}
                    onChange={handleChange}
                    placeholder='Confirm Password'
                    className='mt-1 w-full p-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm'
                    required
                  />
                  <button
                    type='button'
                    onClick={togglePasswordVisibility} // Toggle password visibility on button click
                    className='absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none'
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}{' '}
                    {/* Show/hide eye icons */}
                  </button>
                </div>
              </div>
              <div className='col-span-6'>
                <label htmlFor='MarketingAccept' className='flex gap-4'>
                  <input
                    type='checkbox'
                    id='MarketingAccept'
                    name='marketing_accept'
                    className='size-5 rounded-md p-2 border-gray-200 bg-white shadow-sm'
                  />

                  <span className='text-sm text-gray-700'>
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>
              <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <button className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>
                  Create an account
                </button>

                <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
                  Already have an account? {` `}
                  <a href='/login' className='text-gray-700 underline'>
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};
export default Register;
