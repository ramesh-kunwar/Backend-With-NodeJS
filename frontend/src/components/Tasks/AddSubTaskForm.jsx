import React from "react";
import Container from "../common/Container";

const AddSubTaskForm = () => {
  return (
    <Container>
      <form action="" className="flex items-center gap-3 ">
        <input
          type="text"
          id="add_task"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block   p-2"
          placeholder="Add Task"
        />

        <input
          type="submit"
          value="Add Task"
          className="bg-blue-600 text-white text-xs  rounded-lg p-2 cursor-pointer"
        />
      </form>
    </Container>
  );
};

export default AddSubTaskForm;
