import React from 'react'
import ActionButton from './ActionButton';

export default function TodoCard({ todo }) {
  return (
    <div className='flex align-middle items-center'>

        {/* TASK TITLE */}
        <div className='flex-1'>{todo.title}</div>

        {/* CREATION DATE */}
        <div className='w-[150px] text-center'>{todo.created_at}</div>

        {/* ACTIONS */}
        <div className='w-[150px] flex justify-end gap-2'>
            <ActionButton
                action="edit"
                tooltip="This is a tooltip"
                onClick={() => alert('Button clicked!')}
            />
            <ActionButton
                action="delete"
                tooltip="This is a tooltip"
                onClick={() => alert('Button clicked!')}
            />
        </div>

    </div>
  )
}