import React, { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([{}]);

  useEffect(() => {
    function fetchTasks() {
      fetch("api/v1/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }

    fetchTasks();
    // console.log(tasks);
    // console.log(tasks?.data[0]?._id);
  }, []);

  return (
    <div>
      {tasks?.data?.map((task) => {
        return (
          <div key={task?._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
