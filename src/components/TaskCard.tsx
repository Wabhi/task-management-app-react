import React from "react";
import { TaskTypes } from "../types/TaskTypes";
import "./TaskCard.css";

interface TaskCardProps {
  task: TaskTypes;
  onMoveTask: (id: number, status: TaskTypes["status"]) => void;
  onEditTask: (task: TaskTypes) => void;
  availableStatuses: TaskTypes["status"][];
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onMoveTask, 
  onEditTask, 
  availableStatuses 
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TaskTypes["status"];
    onMoveTask(task.id, newStatus);
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.date}</p>
      <div className="task-actions">
        <select 
          onChange={handleStatusChange} 
          className="status-dropdown"
          value=""
        >
          <option value="" disabled>Change Task Status</option>
          {availableStatuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        <button 
          onClick={() => onEditTask(task)} 
          className="btn-gray"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskCard;