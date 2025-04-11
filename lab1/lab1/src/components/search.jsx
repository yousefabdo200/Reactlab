import React from 'react';

export default function Search({ onSearch }) {
  return (
    <div className="p-4 ">
      <input
        type="text"
        placeholder="Search by item name"
        onChange={(e) => onSearch(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded w-full"
      />
    </div>
  );
}
