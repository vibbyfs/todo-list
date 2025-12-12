import { useState, useEffect } from "react";

function ProblemDescModal({ isOpen, onClose, onSubmit, initialValue = "" }) {
  const [problemDesc, setProblemDesc] = useState(initialValue);

  useEffect(() => {
    setProblemDesc(initialValue);
  }, [initialValue]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(problemDesc);
    setProblemDesc("");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Describe the Problem
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none resize-none"
            rows="4"
            value={problemDesc}
            onChange={(e) => setProblemDesc(e.target.value)}
            placeholder="Enter problem description (optional)"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-900 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProblemDescModal;
