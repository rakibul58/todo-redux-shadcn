// import { useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { useGetTodosQuery } from "../../redux/api/api";
import AddTodoModal from "./AddTodoModal";
import TodoCard, { TTodoCardProps } from "./TodoCard";
import TodoFilter from "./TodoFilter";

const TodoContainer = () => {
  // const todos = useAppSelector((state) =>
  //   state.todos.filteredTodos ? state.todos.filteredTodos : state.todos.todos
  // );
  const [priority, setPriority] = useState("");

  const { data: todos, isLoading } = useGetTodosQuery(priority);

  if (isLoading) {
    return <p>Loading ....</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-[full] rounded-xl p-[5px]">
        {todos.length === 0 ? (
          <div className="bg-white p-5 flex justify-center rounded-md text-2xl font-bold">
            <p>There is no task pending</p>{" "}
          </div>
        ) : (
          <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
            {todos?.data?.map((item: TTodoCardProps) => (
              <TodoCard {...item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoContainer;
