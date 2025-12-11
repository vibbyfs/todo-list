const TodoPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Todo Dashboard
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Kelola todos kamu, update status, dan lihat rekomendasi AI untuk
            problem.
          </p>
        </header>

        {/* Add + Search cards (stack on mobile, side-by-side on md+) */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-6 sm:mb-8">
          {/* Add Todo */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Tambah Todo
            </h2>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()} // nanti diganti useMutation
            >
              <input
                type="text"
                placeholder="Todo title..."
                className="w-full flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                // nanti: value & onChange
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add
              </button>
            </form>
          </section>

          {/* Search */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Search
            </h2>
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              // nanti: value & onChange -> trigger refetch / filter
            />
          </section>
        </div>

        {/* Main content: list (2/3) + detail (1/3) on lg+, stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List & table */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900">
                Daftar Todos
              </h2>
            </div>

            {/* Loading & error indicators (placeholder) */}
            <div className="mb-3 space-y-1 text-sm">
              {/* nanti: tampilkan hanya saat isLoading */}
              <p className="text-slate-500 italic">
                Loading indicator di sini…
              </p>
              {/* nanti: tampilkan hanya saat isError */}
              <p className="text-red-500 italic">Error message di sini…</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-2 pr-2 pl-2 text-left font-semibold text-slate-700">
                      #
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Title
                    </th>
                    <th className="py-2 px-2 text-left font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="py-2 pl-2 pr-2 text-left font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* nanti: map todos di sini */}
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2 text-slate-500">–</td>
                    <td className="py-3 px-2 text-slate-900">
                      Data todos akan muncul di sini.
                    </td>
                    <td className="py-3 px-2 text-slate-500">–</td>
                    <td className="py-3 px-2 text-slate-500">–</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detail panel */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              Detail Todo
            </h2>

            {/* nanti: jika belum ada todo terpilih, tampilkan placeholder */}
            <p className="text-sm text-slate-500 mb-3">
              Pilih todo dari daftar untuk melihat detail dan rekomendasi AI.
            </p>

            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold text-slate-800">Status:</span>{" "}
                <span className="text-slate-700">(nanti diisi)</span>
              </p>
              <p>
                <span className="font-semibold text-slate-800">
                  Problem Desc:
                </span>{" "}
                <span className="text-slate-700">(nanti diisi)</span>
              </p>
              <div>
                <p className="font-semibold text-slate-800 mb-1">
                  AI Recommendation:
                </p>
                <p className="text-slate-700 whitespace-pre-line">
                  (nanti diisi)
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
