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

export const taskBeforePatchMock: ITask = {
  id: 1,
  title: "Test Task",
  assignedQuantity: 1,
  completed: false,
  creatorName: "",
  description: "Description",
  order: 1,
  points: 1,
  taskList: {
    id: 1,
    name: "Test Task List 1",
  },
};

export const taskAfterPatchMock: ITask = {
  id: 1,
  title: "Test Task Patched",
  assignedQuantity: 1,
  completed: false,
  creatorName: "",
  description: "Description Patched",
  order: 1,
  points: 20,
  taskList: {
    id: 1,
    name: "Test Task List 1",
  },
};
