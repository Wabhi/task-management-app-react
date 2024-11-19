import React from 'react';
import { TaskTypes } from "../types/TaskTypes";
import "./AddTaskForm.css";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Partial<TaskTypes>;
  onSave: (task: Partial<TaskTypes>) => void;
}

const AddTaskForm: React.FC<TaskModalProps> = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = React.useState(task?.title || "");
  const [description, setDescription] = React.useState(task?.description || "");

  React.useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
  }, [task]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    onSave({
      ...task,
      title,
      description,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="input-field"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="input-field textarea-field"
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit} className="submit-button">
            {task ? "Update Task" : "Add Task"}
          </button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
