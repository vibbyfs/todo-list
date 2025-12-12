import React from "react";

const SearchTodo = ({ search, setSearch, isRefreshing }) => {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
      />

      {isRefreshing && (
        <p className="mt-1 text-xs text-slate-500 italic">Refreshing data...</p>
      )}
    </>
  );
};

export default SearchTodo;
