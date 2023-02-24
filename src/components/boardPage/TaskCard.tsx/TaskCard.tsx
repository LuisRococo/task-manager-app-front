import React from "react";
import "./TaskCard.scss";
import { ITask, TaskStatusEnum } from "../../../interfaces/task";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import { useModalState } from "../../../hooks/useModalState";
import { useDrag } from "react-dnd";
import { DragAndDropItems } from "../../../utils/dragAndDropTypes";
import { useTaskListState } from "../../../hooks/useTaskListState";

export const TaskCard: React.FC<ITask> = ({
  assignedQuantity,
  creatorName,
  status,
  taskId,
  title,
  description,
  points,
  taskList,
}) => {
  const { openTaskDataModal } = useModalState();
  const { moveTaskToOtherList } = useTaskListState();
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DragAndDropItems.TASK,
      item: { taskId },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult() as any;
        if (item && dropResult) {
          moveTaskToOtherList(item.taskId, dropResult.listId);
        }
      },
    }),
    [taskId, taskList]
  );

  function handleTaskClick() {
    openTaskDataModal({
      assignedQuantity,
      creatorName,
      description,
      points,
      status,
      taskId,
      taskList,
      title,
    });
  }

  return (
    <div
      className="task-card rounded border px-2 py-3 mb-3 bg-light"
      onClick={handleTaskClick}
      ref={dragRef}
      style={{ opacity }}
    >
      <small className="text-muted fst-italic">Task</small>
      <p>{title}</p>
      <hr />
      <p>
        <strong>Author: </strong>
        {creatorName}
      </p>

      <div className="d-flex justify-content-between">
        <p className="p-0 m-0">{assignedQuantity} people</p>
        <TaskCardStatus completed={status === TaskStatusEnum.complete} />
      </div>
    </div>
  );
};
