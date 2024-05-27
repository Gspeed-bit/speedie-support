import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/constant/spinner';
const Login = () => {
  const initialFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showSpinner, setShowSpinner] = useState(false);

  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false); // State to manage visibility of password

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const dispatch = useDispatch();
 const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }

    if (isError && message) {
      toast.error(message);
    }
  const userName = user ? `${user.firstName}` : 'null';
    if (isSuccess && user) {
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        navigate('/');
        toast.success(`Welcome Back ${userName} `);
        dispatch(reset());
      }, 2500); // Show spinner for 2 seconds before navigating
    }
  }, [user, navigate, isSuccess, isError, isLoading, message, dispatch]);

  if (showSpinner) {
    return <Spinner />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
    } else {
      const userData = {
        email: email.toLowerCase(), // Convert email to lowercase,
        password,
      };
      dispatch(login(userData));
      setFormData(initialFormData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
if (isLoading){
  <Spinner/>
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
              className='mt-8 grid grid-cols-1 gap-6'
            >
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

              <div className='col-span-6'>
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

              <div className='col-span-6 sm:flex sm:items-center sm:gap-4'>
                <button className='inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500'>
                  Login
                </button>

                <p className='mt-4 text-sm text-gray-500 sm:mt-0'>
                  Don't have an account? {''}
                  <a href='/register' className='text-gray-700 underline'>
                    Register
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
export default Login;
