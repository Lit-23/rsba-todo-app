import React from 'react'
import ActionButton from './ActionButton';
import { formatDate } from '@/Utils/utils';

export default function TodoCard({ todo, onSubmit }) {
  return (
    <div className='flex align-middle items-center border rounded-md bg-gray-50 px-2 py-4'>

        {/* TASK TITLE */}
        <div className='flex-1'>{todo.title}</div>

        {/* CREATION DATE */}
        <div className='w-[150px] text-sm text-center'>{formatDate(todo.created_at)}</div>

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