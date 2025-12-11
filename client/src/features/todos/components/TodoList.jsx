import React from "react";
import SearchTodo from "./SearchTodo";

const TodoList = ({
  todos,
  isLoading,
  isError,
  error,
  search,
  setSearch,
  isRefreshing,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        Daftar Todos
      </h2>
      <SearchTodo
        search={search}
        setSearch={setSearch}
        isRefreshing={isRefreshing}
      />

      {isLoading && (
        <p className="text-sm text-slate-500 italic mb-2">Loading...</p>
      )}

      {isError && (
        <p className="text-sm text-rose-600 mb-2">
          {error.message || "Failed to fetch data"}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {todos.length === 0 ? (
            <p className="text-sm text-slate-500">Data not found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      #
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Title
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, i) => (
                    <tr
                      key={todo.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-2 px-2 text-slate-500">{i + 1}</td>
                      <td className="py-2 px-2 text-slate-500">{todo.title}</td>
                      <td className="py-2 px-2 text-slate-500">
                        {todo.status}
                      </td>
                      <td className="py-2 px-2">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer">
                          See Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default TodoList;
