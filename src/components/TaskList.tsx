import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";

export const TaskList = () => {
  const { tasks, toggleTask, removeTask, editTask, filter } = useTasks();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newText, setNewText] = useState("");

  // 🔽 Apply filter before rendering
  const visibleTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true; // "all"
  });

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setNewText(text);
  };

  const handleSave = (id: number) => {
    if (newText.trim()) {
      editTask(id, newText);
    }
    setEditingId(null);
    setNewText("");
  };

  if (visibleTasks.length === 0) {
    return <p className="text-center text-muted">No tasks found.</p>;
  }

  return (
    <ul className="list-group">
      {visibleTasks.map((task) => (
        <li
          key={task.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            task.completed ? "list-group-item-success" : ""
          }`}
        >
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            {editingId === task.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="form-control form-control-sm"
              />
            ) : (
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
            )}

            {task.dueDate && (
              <small className="text-muted ms-2">
                (Due: {new Date(task.dueDate).toLocaleDateString()})
              </small>
            )}
          </div>

          <div className="btn-group">
            {editingId === task.id ? (
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleSave(task.id)}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleEdit(task.id, task.text)}
              >
                Edit
              </button>
            )}
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
