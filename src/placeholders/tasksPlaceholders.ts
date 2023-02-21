import { ITask, TaskStatusEnum } from "../interfaces/task";
import { randomInteger } from "../utils/utils";

export const taskGroup1: ITask[] = [
  {
    taskId: randomInteger(1, 100),
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    status: TaskStatusEnum.incomplete,
    title: "Beta feature",
  },
  {
    taskId: randomInteger(1, 100),
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Luis Jesus",
    status: TaskStatusEnum.incomplete,
    title: "Alpha feature",
  },
  {
    taskId: randomInteger(1, 100),
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Ricardo Armando",
    status: TaskStatusEnum.incomplete,
    title: "Omega feature",
  },
];

export const taskGroup2: ITask[] = [
  {
    taskId: randomInteger(1, 100),
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    status: TaskStatusEnum.incomplete,
    title: "Beta feature",
  },
];

export const taskGroupCompleted: ITask[] = [
  {
    taskId: randomInteger(1, 100),
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    status: TaskStatusEnum.complete,
    title: "Beta feature",
  },
  {
    taskId: randomInteger(1, 100),
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Luis Jesus",
    status: TaskStatusEnum.complete,
    title: "Alpha feature",
  },
];
