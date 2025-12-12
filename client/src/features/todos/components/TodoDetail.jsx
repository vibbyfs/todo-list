import { getStatusLabel } from "../../../utils/statusHelper";

function TodoDetail({ selectedTodoId, todoDetail, isLoading, isError, error }) {
  return (
    <section className="bg-[#ED985F] rounded-sm border border-black p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-black mb-3">Detail Todo</h2>

      {!selectedTodoId && (
        <p className="text-sm text-black">
          Select a todo from the list to view details and AI recommendations.
        </p>
      )}

      {selectedTodoId && (
        <div className="space-y-2 text-sm sm:text-base">
          {isLoading && <p className="text-black italic">Loading detail...</p>}

          {isError && (
            <p className="text-white">
              Error detail: {error?.message || "Failed to load details."}
            </p>
          )}

          {todoDetail && !isLoading && !isError && (
            <>
              <p>
                <span className="font-semibold text-slate-800">Title:</span>{" "}
                <span className="text-black">{todoDetail.title}</span>
              </p>
              <p>
                <span className="font-semibold text-slate-800">Status:</span>{" "}
                <span className="text-black">
                  {getStatusLabel(todoDetail.status)}
                </span>
              </p>
              <p>
                <span className="font-semibold text-slate-800">
                  Problem Desc:
                </span>{" "}
                <span className="text-black">
                  {todoDetail.problemDesc || "-"}
                </span>
              </p>
              <div>
                <p className="font-semibold text-slate-800 mb-2">
                  AI Recommendation:
                </p>
                <div className="bg-[#F7B980] rounded-lg p-4 border border-black">
                  <p className="text-black whitespace-pre-line text-sm leading-relaxed">
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
