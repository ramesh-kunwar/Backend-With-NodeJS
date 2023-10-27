import { Link } from "react-router-dom";
import Container from "../common/Container";
import React, { useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskDetailModel from "./TaskDetailModel";
import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../store/taskApiSlice";

const Tasks = () => {
  // const [tasks, setTasks] = useState([{}]);
  const [completed, setCompleted] = useState(false);
  const [openTaskDetailModel, setOpenTaskDetailModel] = useState(false);

  const { data: tasks, isError, isLoading } = useGetTasksQuery();

  const handleChecked = (e) => {
    const checked = e.target.checked;
    setCompleted(checked);
    console.log(checked);
  };

  const handleMouseOver = (e) => {
    // Show icons on mouse over
    const icons = e.currentTarget.querySelectorAll(".edit-icon, .delete-icon");
    icons.forEach((icon) => {
      icon.classList.remove("hidden");
    });
  };

  const handleMouseOut = (e) => {
    const icons = e.currentTarget.querySelectorAll(".edit-icon, .delete-icon");
    icons.forEach((icon) => {
      icon.classList.add("hidden");
    });
  };

  const handleEdit = (task) => {
    // Edit task
    console.log("handle edit", task);
  };

  const handleDelete = (task) => {
    console.log("handle delete", task._id);
    function deleteTasks() {
      fetch(`api/v1/tasks/${task._id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
    deleteTasks();
  };

  const handleTaskDetailModel = (task) => {
    setOpenTaskDetailModel((prev) => !prev);
  };
  return (
    <Container>
      <AddTaskForm />
      {tasks?.data?.map((task) => {
        return (
          <div
            onClick={() => handleTaskDetailModel(task)}
            onMouseOver={(e) => handleMouseOver(e)}
            onMouseOut={(e) => handleMouseOut(e)}
            key={task?._id}
            className="flex items- px-4  py-4 border border-gray-200 rounded my-2  cursor-pointer hover:shadow-md"
          >
            {openTaskDetailModel && <TaskDetailModel task={task} />}
            {/* <input
              id={task?._id}
              type="checkbox"
              value={task?.completed}
              onChange={handleChecked}
              name="bordered-checkbox"
              checked={task?.completed}
              className="w-4 h-5  block text-blue-600 bg-gray-100 border-gray-300  focus:ring-blue-500  focus:ring-2 "
            /> */}

            <input
              id={task?._id}
              type="checkbox"
              value={task?.completed}
              onChange={handleChecked}
              name="bordered-checkbox"
              checked={task?.completed}
              className="mt-1 checked:bg-blue-500 checked:border-transparent rounded-full w-6 h-6"
            />

            <div className="w-full ml-2 text-sm font-medium text-gray-900 ">
              <p>{task?.title}</p>
              {/* <p>{task?.subTasks[0]?.title}</p> */}

              <p className="text-gray-500  text-xs my-1">{task?.description}</p>

              {task?.subTasks?.length > 0 && (
                <div className="sub-tasks flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-label="0/2 sub-tasks"
                  >
                    <path
                      fill="currentColor"
                      d="M4.5 2A2.5 2.5 0 0 1 5 6.95V8.5a2.5 2.5 0 0 0 2.336 2.495L7.5 11h1.55a2.5 2.5 0 1 1 0 1H7.5a3.5 3.5 0 0 1-3.495-3.308L4 8.5V6.95A2.5 2.5 0 0 1 4.5 2zm7 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-7-7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                    ></path>
                  </svg>
                  <p className="text-gray-500 text-xs my-1">
                    {" "}
                    0/{" "}
                    {task?.subTasks?.length > 0
                      ? task?.subTasks?.length
                      : ""}{" "}
                  </p>
                </div>
              )}
            </div>

            <div className="icons flex items-center gap-2 ">
              <Link
                onClick={() => handleEdit(task)}
                to={"#"}
                className="edit-icon hidden text-blue-400 cursor-pointer hover:text-blue-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </Link>
              <Link
                onClick={() => handleDelete(task)}
                to="#"
                className="delete-icon hidden cursor-pointer text-red-400 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Tasks;
