import { useState } from "react";
import { TitleForm } from "./components/TitleForm";
import { useCreateTodo } from "./hooks/useCreateTodo";

const TodoPage = () => {
  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const createTodoMutation = useCreateTodo();

  const handleAddTodo = (e) => {
    e.preventDefault();

    createTodoMutation.mutate(
      {
        title: title.trim(),
      },
      {
        onSuccess: (data) => {
          setTitle("");
          setSuccessMessage(data.message || "Todo berhasil ditambahkan!");
          setTimeout(() => setSuccessMessage(""), 3000);
        },
        onError: () => {
          setTimeout(() => {
            createTodoMutation.reset();
          }, 3000);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Todo Dashboard
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Add your todo and watch your todo progress.
          </p>
        </header>

        <TitleForm
          title={title}
          setTitle={setTitle}
          onSubmit={handleAddTodo}
          isPending={createTodoMutation.isPending}
          error={createTodoMutation.isError ? createTodoMutation.error : null}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
};

export default TodoPage;
