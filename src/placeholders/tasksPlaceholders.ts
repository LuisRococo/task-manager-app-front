import { ITask, TaskStatusEnum } from "../interfaces/task";
import { randomInteger } from "../utils/utils";

export const taskGroup1: ITask[] = [
  {
    taskId: randomInteger(1, 1000),
    order: 1,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    status: TaskStatusEnum.incomplete,
    title: "Beta feature",
    description:
      "Adipisicing pariatur qui nulla est do dolor aliquip culpa irure duis sint.",
    points: randomInteger(1, 20),
    taskList: {
      listId: 0,
      title: "Pending",
    },
  },
  {
    taskId: randomInteger(1, 1000),
    order: 2,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Luis Jesus",
    status: TaskStatusEnum.incomplete,
    title: "Alpha feature",
    description:
      "Aliquip sunt eu deserunt duis consectetur ea laborum deserunt aliquip et culpa.",
    points: randomInteger(1, 20),
    taskList: {
      listId: 0,
      title: "Pending",
    },
  },
  {
    taskId: randomInteger(1, 1000),
    order: 3,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Ricardo Armando",
    status: TaskStatusEnum.incomplete,
    title: "Omega feature",
    description:
      "Fugiat nostrud proident non nulla occaecat proident duis consequat.",
    points: randomInteger(1, 20),
    taskList: {
      listId: 0,
      title: "Pending",
    },
  },
];

export const taskGroup2: ITask[] = [
  {
    taskId: randomInteger(1, 1000),
    order: 1,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    status: TaskStatusEnum.incomplete,
    title: "Beta feature",
    description: "Lorem deserunt ipsum labore non est mollit.",
    points: randomInteger(1, 20),
    taskList: {
      listId: 2,
      title: "In Review",
    },
  },
];

export const taskGroupCompleted: ITask[] = [
  {
    taskId: randomInteger(1, 1000),
    order: 1,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    status: TaskStatusEnum.complete,
    title: "Beta feature",
    description: "Ad officia ad pariatur dolor enim cillum eu enim.",
    points: randomInteger(1, 20),
    taskList: {
      listId: 3,
      title: "Finished",
    },
  },
  {
    taskId: randomInteger(1, 1000),
    order: 2,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Luis Jesus",
    status: TaskStatusEnum.complete,
    title: "Alpha feature",
    description: "Duis non ut sit non et.",
    points: randomInteger(1, 20),
    taskList: {
      listId: 3,
      title: "Finished",
    },
  },
];
