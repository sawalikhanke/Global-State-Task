import React from "react";
import { useTasks } from "../contexts/TaskContext";

export const TaskStats = () => {
  const { tasks, filter } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  // 🔽 Filter-aware stats
  const visibleTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true; // "all"
  });

  const visibleCompleted = visibleTasks.filter((t) => t.completed).length;
  const visiblePending = visibleTasks.filter((t) => !t.completed).length;

  return (
    <div className="alert alert-info d-flex justify-content-between align-items-center">
      <span>
        <strong>Total:</strong> {total} |{" "}
        <strong>Completed:</strong> {completed} |{" "}
        <strong>Pending:</strong> {pending}
      </span>

      <span className="badge bg-primary">
        Showing {visibleTasks.length} ({filter}) → ✅ {visibleCompleted} | ⏳ {visiblePending}
      </span>
    </div>
  );
};
