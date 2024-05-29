import React from 'react';
import { useSelector } from 'react-redux';

const NewNote = ({ note, ticket }) => {
  // Get user details from the auth state
  const { user } = useSelector((state) => state.auth);

  // Ensure note and user are defined
  if (!note || !user) {
    return null; // Or return a fallback UI
  }

  return (
    <div className=''>
      <div
        key={note._id}
        className={`p-4 rounded-lg ${
          note.isStaff ? 'bg-primary-100' : 'bg-grey-100'
        }`}
      >
        <div className='flex-between'>
          <h4 className='p-semibold-16'>
            Note from{' '}
            {note.isStaff ? <span>Speedie Staff</span> : user.lastName}
          </h4>
          <span className='text-[10px] md:text-sm'>
            {`${new Date(note.createdAt).toLocaleString('de-DE', {
              hour12: true,
            })}`}
          </span>
        </div>
        <div className='mt-4'>
          <p className='p-regular-14'>{note.text}</p>
        </div>
      </div>
    </div>
  );
};

export default NewNote;
