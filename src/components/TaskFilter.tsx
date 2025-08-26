import React from "react";
import { useTasks } from "../contexts/TaskContext";

export const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  return (
    <div className="mb-4 d-flex justify-content-center gap-2">
      <button
        className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`btn btn-sm ${filter === "completed" ? "btn-success" : "btn-outline-success"}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={`btn btn-sm ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
};
