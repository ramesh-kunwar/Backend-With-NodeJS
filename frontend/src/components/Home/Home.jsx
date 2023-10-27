import React from "react";
import Tasks from "../Tasks/Tasks";

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-7">Task Manager App</h1>
      <Tasks />
    </div>
  );
};

export default Home;
