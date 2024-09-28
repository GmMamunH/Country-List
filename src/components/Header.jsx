/* eslint-disable no-unused-vars */
import React from 'react'

const Header = (searchTerm, setSearchTerm) => {
  return (
    <div>
      {" "}
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center gap-10">
        <h1 className="text-3xl text-green-800 font-bold">Country List</h1>
        <input
          type="text"
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        />
      </div>
    </div>
  );
};

export default Header