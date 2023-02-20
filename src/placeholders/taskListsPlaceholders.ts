import { ITaskList } from "../interfaces/taskList";

export const TaskLists: ITaskList[] = [
  {
    color: "#e8d22c",
    listId: 0,
    name: "Pending",
    priority: 1,
  },
  {
    color: "#d1952c",
    listId: 1,
    name: "In Progress",
    priority: 2,
  },
  {
    color: "#1c1c1c",
    listId: 2,
    name: "In Review",
    priority: 3,
  },
  {
    color: "#5dad2b",
    listId: 3,
    name: "Finished",
    priority: 4,
  },
];
