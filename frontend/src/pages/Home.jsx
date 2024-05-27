import { Link } from 'react-router-dom';
import { BsFillPatchQuestionFill, BsTicketDetailedFill } from 'react-icons/bs';
import { useSelector} from 'react-redux';
const Home = () => {

    const { user} = useSelector(
      (state) => state.auth
    );
     const userName = user
       ? `${user.firstName}  ${user.lastName}`
       : 'Guest';

  return (
    <>
      <section className='text-center h5-bold m-10'>
        <div className=''>
        
          <h1 className='text-end mb-5 p-semibold-14'>welcome back, {userName}</h1>
          <h1 className='h5-bold md:h1-bold text-gray-900  '>
            what do you need help with?
          </h1>
          <p className='mt-4 md:h5-bold p-medium-20 text-gray-500'>
            please choose from an option below
          </p>
        </div>
        <div className='mt-10 p-semibold-20  flex flex-col md:flex-row gap-3 '>
          <button className='capitalize p-2 rounded-lg w-full shadow-sm border-2 hover:bg-bluey-100 hover:text-bluey border-bluey-400'>
            <Link to='/new-ticket' className='flex-center gap-3'>
              <BsFillPatchQuestionFill />
              <span>create new ticket</span>
            </Link>
          </button>
          <button className='capitalize hover:bg-bluey-100 hover:text-bluey bg-bluey-400 text-white p-2 rounded-lg w-full shadow-sm border'>
            <Link to='/tickets' className='flex-center gap-3'>
              <BsTicketDetailedFill />
              <span>view my tickets</span>
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};
export default Home;
