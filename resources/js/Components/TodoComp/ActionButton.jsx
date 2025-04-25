import React from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaExclamation } from "react-icons/fa";

export default function ActionButton ({ action, onClick }) {
  return (
    <div className="relative group inline-block">
      <button
        onClick={onClick}
        className={`
          ${action === "edit" && "text-blue-500 hover:bg-blue-500 hover:text-white"}
          ${action === "delete" && "text-red-500 hover:bg-red-500 hover:text-white"}
          px-4 py-2 rounded-lg focus:outline-none transition
        `}
      >
        { 
          action === "edit" ? <CiEdit className='h-5 w-5'/> 
          : action === "delete" ? <MdDeleteOutline className='h-5 w-5'/>
          : <FaExclamation className='h-5 w-5'/>
        }
      </button>
      
      {/* Tooltip */}
      <div className={`
          ${action === "edit" ? "bg-blue-500"
            : action === "delete" ? "bg-red-500"
            : "bg-gray-800"}
          }
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10
      `}>
        {
          action === "edit" || action === "delete" ? action : "Action not recognized"
        }
      </div>
    </div>
  );
};