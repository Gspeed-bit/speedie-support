import React from 'react';

const TicketsItems = ({ ticket }) => {
  return (
    <tr>
      <td className='whitespace-nowrap px-4 py-2 text-white'>
        {new Date(ticket.createdAt).toLocaleString('en-US')}
      </td>
      <td className='whitespace-nowrap px-4 py-2 text-white'>
        {ticket.product}
      </td>
      <td className='whitespace-nowrap capitalize px-4 py-2'>
        <button
          className={`inline-block capitalize rounded px-4 py-2 text-xs font-medium text-white ${
            ticket.status.toLowerCase() === 'new'
              ? 'bg-orange-500 hover:bg-orange-400'
              : ticket.status.toLowerCase() === 'open'
              ? 'bg-green-500  hover:bg-green-400'
              : ticket.status.toLowerCase() === 'in progress'
              ? 'bg-purple-500  hover:bg-purple-400'
              : ticket.status.toLowerCase() === 'closed'
              ? 'bg-gray-500  hover:bg-gray-400'
              : ''
          }`}
        >
          {ticket.status.toLowerCase()}
        </button>
      </td>

      <td className='whitespace-nowrap px-4 py-2'>
        <button className='inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700'>
          View
        </button>
      </td>
    </tr>
  );
};

export default TicketsItems;
