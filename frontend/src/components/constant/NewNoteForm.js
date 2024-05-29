import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const NewNoteForm = ({ onClose }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    // Here you can dispatch an action to add the note to the store
    // For now, let's just log the note text
    console.log('Note text:', noteText);

    // Clear the input field
    setNoteText('');

    // Close the modal
    onClose();
  };

  return (
    <div className='md:min-w-[600px]  min-w-[400px] bg-white rounded-lg p-6'>
      <div className='flex justify-end'>
        <IoCloseCircleOutline
          onClick={onClose}
          className='text-bluey-400 text-3xl cursor-pointer'
        />
      </div>
      <h2 className=' text-bluey-400 p-semibold-20 md:h5-bold mb-4'>
        Add a New Note
      </h2>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows='2'
        placeholder='Enter your note here...'
        className='w-full border border-gray-300 rounded-md p-2 mb-4'
      ></textarea>
      <div className='flex justify-end'>
        <button
          onClick={handleAddNote}
          className='bg-blue-500 text-white py-2 px-4 rounded-md mr-2'
        >
          Add Note
        </button>
        <button
          onClick={onClose}
          className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewNoteForm;
