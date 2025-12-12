import { getStatusLabel } from "../../../utils/statusHelper";

function TodoDetail({ selectedTodoId, todoDetail, isLoading, isError, error }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 mt-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">Detail Todo</h2>

      {!selectedTodoId && (
        <p className="text-sm text-slate-500">
          Select a todo from the list to view details and AI recommendations.
        </p>
      )}

      {selectedTodoId && (
        <div className="space-y-2 text-sm sm:text-base">
          {isLoading && (
            <p className="text-slate-500 italic">Loading detail...</p>
          )}

          {isError && (
            <p className="text-rose-600">
              Error detail: {error?.message || "Failed to load details."}
            </p>
          )}

          {todoDetail && !isLoading && !isError && (
            <>
              <p>
                <span className="font-semibold text-slate-800">Title:</span>{" "}
                <span className="text-slate-700">{todoDetail.title}</span>
              </p>
              <p>
                <span className="font-semibold text-slate-800">Status:</span>{" "}
                <span className="text-slate-700">
                  {getStatusLabel(todoDetail.status)}
                </span>
              </p>
              <p>
                <span className="font-semibold text-slate-800">
                  Problem Desc:
                </span>{" "}
                <span className="text-slate-700">
                  {todoDetail.problemDesc || "-"}
                </span>
              </p>
              <div>
                <p className="font-semibold text-slate-800 mb-2">
                  AI Recommendation:
                </p>
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                  <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">
                    {todoDetail.aiRecomendation || "No AI recommendation yet."}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default TodoDetail;
