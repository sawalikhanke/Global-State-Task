// src/components/TaskForm.tsx
import React, { useState } from "react";
import { useTasks } from "../contexts/TaskContext";

export const TaskForm = () => {
  const { addTask } = useTasks();
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text, dueDate);
    setText("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="date"
        className="form-control"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className="btn btn-success">Add</button>
    </form>
  );
};
