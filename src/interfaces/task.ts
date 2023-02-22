export enum TaskStatusEnum {
  complete,
  incomplete,
}

export interface ITask {
  taskId: number;
  title: string;
  creatorName: string;
  status: TaskStatusEnum;
  assignedQuantity: number;
}
