// src/components/TaskInput.tsx
import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";

export const TaskInput = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim());
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex mb-4 shadow-sm"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <input
        type="text"
        className="form-control"
        placeholder="✍️ Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary">Add</button>
    </form>
  );
};
