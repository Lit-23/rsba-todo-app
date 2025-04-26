import React from 'react';

export default function Toast({ message, show, onClose }) {
  if (!show) return null;

  return (
    <div className="absolute top-[-100px] right-6 sm:right-12 lg:right-14 z-50">
      <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-4">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
