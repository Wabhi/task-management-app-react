import React from "react";
import { TaskTypes } from "../types/TaskTypes";
import TaskCard from "./TaskCard";
import './TaskColumn.css'

interface TaskColumnProps {
  status: "todo" | "inprogress" | "complete" | "pending";
  tasks: TaskTypes[];
  onMoveTask: (id: number, status: TaskTypes["status"]) => void;
  onEditTask: (task: TaskTypes) => void;  
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  status, 
  tasks, 
  onMoveTask, 
  onEditTask 
}) => {
  const availableStatuses = (): TaskTypes["status"][] => {
    const allStatuses: TaskTypes["status"][] = ['todo', 'inprogress', 'pending', 'complete'];
    return allStatuses.filter(s => s !== status);
  };

  return (
    <div className={`task-column ${status}`}>
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onMoveTask={onMoveTask} 
          onEditTask={onEditTask}
          availableStatuses={availableStatuses()}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
