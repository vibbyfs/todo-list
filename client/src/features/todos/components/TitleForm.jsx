export const TitleForm = ({
  title,
  setTitle,
  onSubmit,
  isPending,
  error,
  successMessage,
}) => {
  return (
    <section className="bg-[#ED985F] rounded-sm border border-black p-4 sm:p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-3">New Todo</h2>

      <form className="flex flex-col sm:flex-row gap-3" onSubmit={onSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          placeholder="e.g. Running every weekend"
          className="w-full flex-1 rounded-sm border border-black bg-[#F7B980] px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-black"
        />

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-sm bg-[#ED985F] border border-black px-4 py-2 text-sm font-semibold text-black hover:bg-[#001F3D] hover:text-white cursor-pointer"
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {successMessage && (
        <p className="text-white text-sm font-medium mb-2">{successMessage}</p>
      )}
      {error && <p className="mt-2 text-sm text-white">{error.message}</p>}
    </section>
  );
};
