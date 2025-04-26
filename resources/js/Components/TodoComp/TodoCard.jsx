import React, { useEffect, useRef, useState } from 'react'
import ActionButton from './ActionButton';
import { formatDate } from '@/Utils/utils';
import useDeviceWidth from '@/Hooks/useSpecificDeviceWidth';

export default function TodoCard({ todo, onSubmit }) {
  const {deviceWidth: smallScreen} = useDeviceWidth();
  const [showActions, setShowActions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    console.log('smallScreen: ', smallScreen);
  },[smallScreen]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex align-middle items-center border rounded-md bg-gray-50 px-2 py-4'>

        {/* TASK TITLE */}
        <div className='flex-1'>{todo.title}</div>

        {
          /* TASK DESCRIPTION */
          smallScreen ? (
            <div className="relative overflow-visible" ref={dropdownRef}>
              <button
                onClick={() => setShowActions(!showActions)}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-200"
              >
                Actions
              </button>
    
              {showActions && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded border">
                  <button
                    onClick={() => {
                      onSubmit('edit', todo);
                      setShowActions(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onSubmit('delete', todo);
                      setShowActions(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* CREATION DATE */}
              <div className='w-[150px] text-sm text-center'>{formatDate(todo.created_at)}</div>
      
              {/* ACTIONS */}
              <div className='w-[150px] flex justify-end gap-2'>
                  <ActionButton
                      action="edit"
                      tooltip="This is a tooltip"
                      onClick={() => onSubmit('edit', todo)}
                  />
                  <ActionButton
                      action="delete"
                      tooltip="This is a tooltip"
                      onClick={() => onSubmit('delete', todo)}
                  />
              </div>
            </>
          )
        }
        


    </div>
  )
}