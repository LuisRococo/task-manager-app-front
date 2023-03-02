import { ITaskListState } from "../interfaces/taskList";
import {
  taskGroup1,
  taskGroup2,
  taskGroupCompleted,
} from "./tasksPlaceholders";

export const taskLists: ITaskListState[] = [
  {
    color: "#e8d22c",
    id: 0,
    name: "Pending",
    priority: 1,
    tasks: taskGroup1,
  },
  {
    color: "#d1952c",
    id: 1,
    name: "In Progress",
    priority: 2,
    tasks: [],
  },
  {
    color: "#1c1c1c",
    id: 2,
    name: "In Review",
    priority: 3,
    tasks: taskGroup2,
  },
  {
    color: "#5dad2b",
    id: 3,
    name: "Finished",
    priority: 4,
    tasks: taskGroupCompleted,
  },
];
