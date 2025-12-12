import React from "react";

const SearchTodo = ({ search, setSearch, isRefreshing }) => {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-sm border border-black bg-[#F7B980] px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-black"
      />

      {isRefreshing && (
        <p className="mt-1 text-xs text-black italic">Refreshing data...</p>
      )}
    </>
  );
};

export default SearchTodo;
