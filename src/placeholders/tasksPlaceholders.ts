import { ITask } from "../interfaces/task";
import { randomInteger } from "../utils/utils";

export const taskGroup1: ITask[] = [
  {
    id: randomInteger(1, 1000),
    order: 1,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    completed: false,
    title: "Beta feature",
    description:
      "Adipisicing pariatur qui nulla est do dolor aliquip culpa irure duis sint.",
    points: randomInteger(1, 20),
    taskList: {
      id: 0,
      name: "Pending",
    },
  },
  {
    id: randomInteger(1, 1000),
    order: 2,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Luis Jesus",
    completed: false,
    title: "Alpha feature",
    description:
      "Aliquip sunt eu deserunt duis consectetur ea laborum deserunt aliquip et culpa.",
    points: randomInteger(1, 20),
    taskList: {
      id: 0,
      name: "Pending",
    },
  },
  {
    id: randomInteger(1, 1000),
    order: 3,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Ricardo Armando",
    completed: false,
    title: "Omega feature",
    description:
      "Fugiat nostrud proident non nulla occaecat proident duis consequat.",
    points: randomInteger(1, 20),
    taskList: {
      id: 0,
      name: "Pending",
    },
  },
];

export const taskGroup2: ITask[] = [
  {
    id: randomInteger(1, 1000),
    order: 1,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    completed: false,
    title: "Beta feature",
    description: "Lorem deserunt ipsum labore non est mollit.",
    points: randomInteger(1, 20),
    taskList: {
      id: 2,
      name: "In Review",
    },
  },
];

export const taskGroupCompleted: ITask[] = [
  {
    id: randomInteger(1, 1000),
    order: 1,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Jesus Rolando",
    completed: true,
    title: "Beta feature",
    description: "Ad officia ad pariatur dolor enim cillum eu enim.",
    points: randomInteger(1, 20),
    taskList: {
      id: 3,
      name: "Finished",
    },
  },
  {
    id: randomInteger(1, 1000),
    order: 2,
    assignedQuantity: randomInteger(1, 8),
    creatorName: "Luis Jesus",
    completed: true,
    title: "Alpha feature",
    description: "Duis non ut sit non et.",
    points: randomInteger(1, 20),
    taskList: {
      id: 3,
      name: "Finished",
    },
  },
];
