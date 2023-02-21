import React, { useEffect, useState } from "react";
import "./TaskList.scss";
import { ITaskList } from "../../../interfaces/taskList";
import { EmptyTaskListCard } from "./EmptyTaskListCard";
import { ITask } from "../../../interfaces/task";
import { TaskCard } from "../TaskCard.tsx/TaskCard";
import {
  taskGroup1,
  taskGroup2,
  taskGroupCompleted,
} from "../../../placeholders/tasksPlaceholders";

interface CardList {
  taskList: ITaskList;
}

export const TaskList: React.FC<CardList> = ({ taskList }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    // Placeholder code
    if (taskList.priority === 1) {
      setTasks(taskGroup1);
    } else if (taskList.priority === 2) {
      setTasks(taskGroup2);
    } else if (taskList.priority === 4) {
      setTasks(taskGroupCompleted);
    }
  }, []);

  return (
    <div className="task-list mx-2 col-inside-scroll pb-4 h-100">
      <div className="w-100 mb-5">
        <div className="w-100 bg-light rounded-top p-3 text-center border">
          <p className="h6 m-0">{taskList.name}</p>
          <small className="text-muted">{taskList.priority}° Priority</small>
        </div>
        <div
          className="task-list-bottom rounded-bottom"
          style={{ backgroundColor: taskList.color }}
        ></div>
      </div>

      <div>
        {tasks.length == 0 && <EmptyTaskListCard />}
        {tasks.length != 0 &&
          tasks.map((task) => {
            return <TaskCard key={task.taskId} {...task} />;
          })}
      </div>
    </div>
  );
};
