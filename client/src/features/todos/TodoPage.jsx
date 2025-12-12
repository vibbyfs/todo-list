import { useState } from "react";
import { TitleForm } from "./components/TitleForm";
import { useCreateTodo } from "./hooks/useCreateTodo";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/UseTodos";
import { useUpdateTodoStatus } from "./hooks/useUpdateTodoStatus";
import { UseTodoDetail } from "./hooks/useTodoDetail";
import TodoDetail from "./components/TodoDetail";
import ProblemDescModal from "./components/ProblemDescModal";

const TodoPage = () => {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  const createTodoMutation = useCreateTodo();

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useTodos(search);

  const updateStatusMutation = useUpdateTodoStatus();

  const {
    data: todoDetail,
    isLoading: isDetailLoading,
    isError: isDetailError,
    error: detailError,
  } = UseTodoDetail(selectedTodoId);

  const handleAddTodo = (e) => {
    e.preventDefault();

    createTodoMutation.mutate(
      {
        title: title.trim(),
      },
      {
        onSuccess: (data) => {
          setTitle("");
          setSuccessMessage(data.message || "Todo added successfully!");
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

  const handleChangeStatus = (todo, newStatus) => {
    if (!newStatus || newStatus === todo.status) return;

    if (newStatus === "problem") {
      setPendingStatusChange({ todo, newStatus });
      setIsModalOpen(true);
    } else {
      updateStatusMutation.mutate({
        id: todo.id,
        status: newStatus,
        problemDesc: undefined,
      });
    }
  };

  const handleModalSubmit = (problemDesc) => {
    if (pendingStatusChange) {
      updateStatusMutation.mutate({
        id: pendingStatusChange.todo.id,
        status: pendingStatusChange.newStatus,
        problemDesc,
      });
    }
    setIsModalOpen(false);
    setPendingStatusChange(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPendingStatusChange(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Todo Dashboard
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Manage your todos and track progress.
          </p>
        </header>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:flex-1 lg:min-w-0 order-2 lg:order-1">
            <TodoList
              todos={todos}
              isLoading={isLoading}
              isError={isError}
              error={error}
              search={search}
              setSearch={setSearch}
              isRefreshing={isFetching && !isLoading}
              onChangeStatus={handleChangeStatus}
              isUpdating={updateStatusMutation.isPending}
              UpdateError={
                updateStatusMutation.isError ? updateStatusMutation.error : null
              }
              onSelectTodo={setSelectedTodoId}
              selectedTodoId={selectedTodoId}
            />
          </div>

          <div className="w-full lg:w-96 lg:shrink-0 space-y-6 order-1 lg:order-2">
            <TitleForm
              title={title}
              setTitle={setTitle}
              onSubmit={handleAddTodo}
              isPending={createTodoMutation.isPending}
              error={
                createTodoMutation.isError ? createTodoMutation.error : null
              }
              successMessage={successMessage}
            />

            <TodoDetail
              selectedTodoId={selectedTodoId}
              todoDetail={todoDetail}
              isLoading={isDetailLoading}
              isError={isDetailError}
              error={detailError}
            />
          </div>
        </div>

        <ProblemDescModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          initialValue={pendingStatusChange?.todo.problemDesc || ""}
        />
      </div>
    </div>
  );
};

export default TodoPage;
