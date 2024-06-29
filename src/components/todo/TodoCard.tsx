import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../redux/api/api";
// import { removeTodo, toggleComplete } from "../../redux/features/todoSlice";
// import { useAppDispatch } from "../../redux/hook";
import { Button } from "../ui/button";
import UpdateTodoModal from "./UpdateTodoModal";

export type TTodoCardProps = {
  title: string;
  description: string;
  _id: string;
  isCompleted?: boolean;
  priority: string;
};

const TodoCard = ({
  title,
  description,
  _id,
  isCompleted,
  priority,
}: TTodoCardProps) => {
  // const dispatch = useAppDispatch();

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const toggleState = () => {
    // dispatch(toggleComplete(id));

    const taskData = {
      title,
      description,
      priority,
      isCompleted: !isCompleted,
    };

    const options = {
      id: _id,
      data: taskData,
    };

    updateTodo(options);
  };

  return (
    <div className="rounded-md flex justify-between items-center p-3 border">
      <input
        onChange={toggleState}
        type="checkbox"
        name="complete"
        id="complete"
        defaultChecked={isCompleted}
        className="mr-5"
      />
      <p className="font-semibold flex-1">{title}</p>
      <div className={`flex-1 flex items-center gap-2`}>
        <div
          className={`size-3 rounded-full  ${
            priority === "high" ? "bg-red-500" : null
          } ${priority === "medium" ? "bg-yellow-500" : null} ${
            priority === "low" ? "bg-green-500" : null
          }`}
        ></div>
        <p className="font-semibold">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </p>
      </div>
      <div className="flex-1 mr-5 ml-2">
        {isCompleted ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-yellow-500">Pending</p>
        )}
      </div>
      <p className="flex-[2]">{description}</p>
      <div className="space-x-3">
        <Button onClick={() => deleteTodo(_id)} className="bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
        <UpdateTodoModal
          title={title}
          description={description}
          _id={_id}
          isCompleted={isCompleted}
          priority={priority}
        />
      </div>
    </div>
  );
};

export default TodoCard;
