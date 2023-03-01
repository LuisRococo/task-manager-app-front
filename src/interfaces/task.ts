export interface ITask {
  id: number;
  title: string;
  creatorName: string;
  completed: boolean;
  assignedQuantity: number;
  points: number;
  description: string;
  order: number;
  taskList: {
    id: number;
    name: string;
  };
}
