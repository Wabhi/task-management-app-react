import React, { createContext, useContext, useState, ReactNode } from "react";
import { TaskTypes } from "../types/TaskTypes";

interface TaskContextProps {
  tasks: TaskTypes[];
  addTask: (title: string, description: string) => void;
  editTask: (id: number, updatedTask: Partial<TaskTypes>) => void;
  moveTask: (id: number, status: TaskTypes["status"]) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskTypes[]>([]);


  const addTask = (title: string, description: string) => {
    const newTask: TaskTypes = {
      id: Date.now(), 
      title,
      description,
      status: "todo", 
      date: new Date().toISOString(), 
    };
    setTasks((prev) => [...prev, newTask]); 
  };

  const editTask = (id: number, updatedTask: Partial<TaskTypes>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task 
      )
    );
  };

  const moveTask = (id: number, status: TaskTypes["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status } : task 
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};

