// src/App.tsx
import React from "react";
import { Navbar } from "./components/Navbar";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { TaskStats } from "./components/TaskStats";
import { TaskFilter } from "./components/TaskFilter";
import { Login } from "./components/Login";
import { useUser } from "./contexts/UserContext";

function App() {
  const { user } = useUser();

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <h2 className="mb-4 text-center">📝 Task Manager</h2>
        <TaskStats />
        <TaskFilter />
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
