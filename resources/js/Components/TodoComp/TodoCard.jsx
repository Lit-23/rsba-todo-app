import React from 'react'
import ActionButton from './ActionButton';

export default function TodoCard() {
  return (
    <div className='flex align-middle items-center'>

        {/* TASK TITLE */}
        <div className='flex-1'>task title</div>

        {/* CREATION DATE */}
        <div className='w-[150px] text-center'>Fri Dec 27 2024</div>

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