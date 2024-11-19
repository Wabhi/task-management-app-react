import React,{useState} from "react";
import { useTaskContext } from "./context/TaskContext";
import TaskColumn from "./components/TaskColumn";
import { TaskTypes } from "./types/TaskTypes";
import TasksCount from "./components/TasksCount";
import AddTaskForm from "./components/AddTaskForm";
import './App.css';
import { STATUS_OPTIONS } from "./constants";

const App: React.FC = () => {
  const { tasks, addTask, moveTask, editTask } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskTypes | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const handleAddTask = (task: Partial<TaskTypes>) => {
    addTask(task.title as string, task.description as string);
  };

  const handleMoveTask = (id: number, status: TaskTypes["status"]) => {
    moveTask(id, status);
  };

  const handleEditTask = (task: TaskTypes) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalSave = (task: Partial<TaskTypes>) => {
    if (selectedTask) {
      editTask(selectedTask.id, task);
    } else {
      handleAddTask(task);
    }
    setIsModalOpen(false);
    setSelectedTask(undefined);
  };


  const getVisibleStatuses = () => {
    if (selectedStatus === "all") {
      return ["todo", "inprogress", "pending", "complete"];
    }
    return [selectedStatus];
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Task Management</h1>
        <div className="header-container">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-filter"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status === "all" 
                  ? "All" 
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <button 
            onClick={() => {
              setSelectedTask(undefined);
              setIsModalOpen(true);
            }}
            className="add-task-button"
          >
            Add New Task
          </button>
        </div>
      </div>
      
      <AddTaskForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(undefined);
        }}
        task={selectedTask}
        onSave={handleModalSave}
      />

      <div className="task-board">
        {getVisibleStatuses().map((status) => (
          <div key={status} className="column-container" data-status={status}>
            <div className="column-header">
              <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
              <TasksCount 
                count={tasks.filter(task => task.status === status).length} 
                columnName={status} 
              />
            </div>
            <TaskColumn
              status={status as TaskTypes["status"]}
              tasks={tasks.filter((task) => task.status === status)}
              onMoveTask={handleMoveTask}
              onEditTask={handleEditTask}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
