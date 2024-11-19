import React from "react";

interface CounterProps {
  count: number;
  columnName: string; 
}

const TasksCount: React.FC<CounterProps> = ({ count=0}) => {
  return (
    <div className="counter">
      <h4>({count})</h4>
    </div>
  );
};

export default TasksCount;
