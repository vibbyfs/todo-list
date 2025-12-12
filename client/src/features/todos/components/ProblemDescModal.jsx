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
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#ED985F] bg-opacity-95 backdrop-blur-sm rounded-sm border border-black shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Describe the Problem
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border border-black rounded-sm bg-[#F7B980] p-3 text-sm focus:ring-1 focus:ring-slate-500 focus:border-black outline-none resize-none"
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
              className="px-4 py-2 text-sm font-semibold text-black bg-[#F7B980] border border-black rounded-sm hover:bg-[#001F3D] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-black bg-[#ED985F] border border-black rounded-sm hover:bg-[#001F3D] hover:text-white transition-colors cursor-pointer"
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
