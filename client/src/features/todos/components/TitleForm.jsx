export const TitleForm = ({
  title,
  setTitle,
  onSubmit,
  isPending,
  error,
  successMessage,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">New Todo</h2>

      <form className="flex flex-col sm:flex-row gap-3" onSubmit={onSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          placeholder="e.g. Running every wekeend"
          className="w-full flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {successMessage && (
        <p className="text-green-800 text-sm font-medium mb-2">
          {successMessage}
        </p>
      )}
      {error && <p className="mt-2 text-sm text-rose-600">{error.message}</p>}
    </section>
  );
};
