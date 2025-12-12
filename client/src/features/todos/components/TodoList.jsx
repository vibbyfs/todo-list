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
    <section className="bg-[#ED985F]  rounded-sm border border-black p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">Todo List</h2>
      <div className="mb-2">
        <SearchTodo
          search={search}
          setSearch={setSearch}
          isRefreshing={isRefreshing}
        />
      </div>

      {isLoading && (
        <p className="text-sm text-black italic mb-2">Loading...</p>
      )}

      {isError && (
        <p className="text-sm text-white mb-2">
          {error.message || "Failed to fetch data"}
        </p>
      )}

      {isUpdating && (
        <p className="text-xs text-black italic mb-1">
          Updating todo status...
        </p>
      )}

      {updateError && (
        <p className="text-xs text-white mb-2">
          Failed to update status: {updateError.message}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {todos.length === 0 ? (
            <p className="text-sm text-black">Data not found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-black">
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      #
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Title
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="py-2 px-2 text-center font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, i) => {
                    const isSelected = selectedTodoId === todo.id;
                    return (
                      <tr key={todo.id} className="border-b border-black">
                        <td className="py-2 px-2 text-black">{i + 1}</td>
                        <td className="py-2 px-2 text-black">{todo.title}</td>
                        <td className="py-2 px-2 text-black">
                          {getStatusLabel(todo.status)}
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <select
                              className="rounded-sm border border-black bg-[#F7B980] text-black px-2 py-1 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 cursor-pointer"
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
                            <button
                              type="button"
                              className={`inline-flex items-center justify-center rounded-sm border border-black px-3 py-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-[#001F3D] text-white hover:bg-[#ED985F] hover:text-black"
                                  : "bg-[#ED985F] text-black hover:bg-[#001F3D] hover:text-white"
                              }`}
                              onClick={() => onSelectTodo(todo.id)}
                            >
                              Detail
                            </button>
                          </div>
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
