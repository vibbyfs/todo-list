import React from "react";

const SearchTodo = ({ search, setSearch, isRefreshing }) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 h-full">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">Search</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title..."
        className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
      />

      {isRefreshing && (
        <p className="mt-1 text-xs text-slate-500 italic">Refresing data...</p>
      )}
    </section>
  );
};

export default SearchTodo;
