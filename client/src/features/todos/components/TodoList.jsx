import SearchTodo from "./SearchTodo";
import { STATUS_OPTIONS, getStatusLabel } from "../../../utils/statusHelper";

const TodoList = ({
  todos,
  isLoading,
  isError,
  error,
  search,
  setSearch,
  isRefreshing,
  onChangeStatus,
  isUpdating,
  updateError,
  onSelectTodo,
  selectedTodoId,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        Daftar Todos
      </h2>
      <div>
        <SearchTodo
          search={search}
          setSearch={setSearch}
          isRefreshing={isRefreshing}
        />
      </div>

      {isLoading && (
        <p className="text-sm text-slate-500 italic mb-2">Loading...</p>
      )}

      {isError && (
        <p className="text-sm text-rose-600 mb-2">
          {error.message || "Failed to fetch data"}
        </p>
      )}

      {isUpdating && (
        <p className="text-xs text-slate-500 italic mb-1">
          Update status todo...
        </p>
      )}

      {updateError && (
        <p className="text-xs text-rose-600 mb-2">
          Failed update status: {updateError.message}
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
                  {todos.map((todo, i) => {
                    const isSelected = selectedTodoId === todo.id;
                    return (
                      <tr
                        key={todo.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >
                        <td className="py-2 px-2 text-slate-500">{i + 1}</td>
                        <td className="py-2 px-2 text-slate-500">
                          {todo.title}
                        </td>
                        <td className="py-2 px-2 text-slate-500">
                          {getStatusLabel(todo.status)}
                        </td>
                        <td className="py-2 px-2">
                          <select
                            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={todo.status}
                            onChange={(e) =>
                              onChangeStatus(todo, e.target.value)
                            }
                            disabled={isUpdating}
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <button
                            type="button"
                            className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs sm:text-sm font-medium border shadow-sm ${
                              isSelected
                                ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            }`}
                            onClick={() => onSelectTodo(todo.id)}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
