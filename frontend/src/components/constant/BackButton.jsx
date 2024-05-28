import { Link } from 'react-router-dom';
import { IconArrowBack } from '@tabler/icons-react';
// BackButton component that takes a URL as a prop and renders a button that navigates to that URL
const BackButton = ({ url }) => {
  return (
    // Link component from react-router-dom to handle navigation
    <Link to={url}>
      {/* Button element styled with Tailwind CSS classes */}
      <button
        type='button'
        className='bg-bluey-400 hover:bg-bluey-300 border rounded-xl p-3 px-4 flex gap-2 mt-10 text-white'
      >
        {/* Arrow icon */}
        <IconArrowBack stroke={2} />
        {/* Text that appears next to the back arrow */}
        <span>Go back</span>
      </button>
    </Link>
  );
};

export default BackButton;
