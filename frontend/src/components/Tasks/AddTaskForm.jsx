import React from "react";
import Container from "../common/Container";

const AddTaskForm = () => {
  return (
    <Container>
      <form action="" className="flex items-center gap-3 ">
        <input
          type="text"
          id="add_task"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4  p-2.5"
          placeholder="Add Task"
        />

        <input
          type="submit"
          value="Add Task"
          className="bg-blue-600 text-white w-1/4 rounded-lg p-2.5 cursor-pointer"
        />
      </form>
    </Container>
  );
};

export default AddTaskForm;
