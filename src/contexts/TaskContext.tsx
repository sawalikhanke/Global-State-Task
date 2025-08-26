import React, { createContext, useContext, useEffect, useState } from "react";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;   // ISO string
  dueDate?: string;    // e.g. "2025-08-26" or ISO string
};

export type Filter = "all" | "completed" | "pending";

type TaskContextType = {
  tasks: Task[];
  addTask: (text: string, dueDate?: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  clearCompleted: () => void;

  // 🔽 NEW: filtering support
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_KEY = "tm_tasks";
const FILTER_KEY = "tm_filter";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  // load tasks from localStorage (optional but handy)
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(TASKS_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<Filter>(() => {
    const raw = localStorage.getItem(FILTER_KEY) as Filter | null;
    return raw ?? "all";
  });

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(FILTER_KEY, filter);
  }, [filter]);

  const addTask = (text: string, dueDate?: string) =>
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate,
      },
    ]);

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const removeTask = (id: number) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const editTask = (id: number, newText: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));

  const clearCompleted = () =>
    setTasks((prev) => prev.filter((t) => !t.completed));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        removeTask,
        editTask,
        clearCompleted,
        filter,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};
