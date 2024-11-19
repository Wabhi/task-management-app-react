import React from 'react';
import { STATUS_BUTTONS } from '../../constants';

interface Task {
  id: string;
}

interface TaskStatusButtonsProps {
  task: Task;
  handleMove: (status: string) => void;
  onEditTask: (task: Task) => void;
}



const TaskStatusButtons: React.FC<TaskStatusButtonsProps> = ({ 
  task, 
  handleMove, 
  onEditTask 
}) => {
  return (
    <div className="flex space-x-2">
      {STATUS_BUTTONS.map((button) => (
        <button
          key={button.status}
          onClick={() => handleMove(button.status)}
          className={button.className}
        >
          {button.label}
        </button>
      ))}
      <button 
        onClick={() => onEditTask(task)} 
        className="btn-gray"
      >
        Edit
      </button>
    </div>
  );
};

export default TaskStatusButtons;