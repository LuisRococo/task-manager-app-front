import { ITask } from "../../../interfaces/task";

export const taskStateMockData1: ITask = {
  id: 1,
  assignedQuantity: 10,
  completed: true,
  creatorName: "Admin",
  description: "",
  order: 1,
  points: 1,
  taskList: { id: 1, name: "test" },
  title: "task test title",
};

export const taskStateMockData2: ITask = {
  id: 2,
  assignedQuantity: 10,
  completed: true,
  creatorName: "Admin",
  description: "",
  order: 1,
  points: 1,
  taskList: { id: 1, name: "test" },
  title: "task test title 2",
};

export const taskStateMockData3: ITask = {
  id: 3,
  assignedQuantity: 10,
  completed: true,
  creatorName: "Admin",
  description: "",
  order: 1,
  points: 1,
  taskList: { id: 1, name: "test" },
  title: "task test title 3",
};

export const taskStateMockDataArray: ITask[] = [
  taskStateMockData1,
  taskStateMockData2,
  taskStateMockData3,
];
