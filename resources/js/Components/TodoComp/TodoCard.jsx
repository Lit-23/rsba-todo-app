import React from 'react'
import ActionButton from './ActionButton';
import { formatDate } from '@/Utils/utils';

export default function TodoCard({ todo, onSubmit }) {
  // const handleButtonClick = (action, todo) => {
  //   console.log(`Action: ${action}`, todo); // Log the action and todo data
  //   alert(`Action: ${action}, Todo: ${todo.title}`);
  // };

  return (
    <div className='flex align-middle items-center'>

        {/* TASK TITLE */}
        <div className='flex-1'>{todo.title}</div>

        {/* CREATION DATE */}
        <div className='w-[150px] text-center'>{formatDate(todo.created_at)}</div>

        {/* ACTIONS */}
        <div className='w-[150px] flex justify-end gap-2'>
            <ActionButton
                action="edit"
                tooltip="This is a tooltip"
                onClick={() => onSubmit('edit', todo)} // Pass the todo data
            />
            <ActionButton
                action="delete"
                tooltip="This is a tooltip"
                onClick={() => onSubmit('delete', todo)} // Pass the todo data
            />
        </div>

    </div>
  )
}