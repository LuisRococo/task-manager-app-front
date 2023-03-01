import React from "react";
import "./TaskCard.scss";
import { ITask } from "../../../interfaces/task";
import { TaskCardStatus } from "../TaskCardStatus/TaskCardStatus";
import { useModalState } from "../../../hooks/useModalState";
import { useDrag, useDrop } from "react-dnd";
import { DragAndDropItems } from "../../../utils/dragAndDropTypes";
import { useTaskListState } from "../../../hooks/useTaskListState";

export const TaskCard: React.FC<ITask> = ({
  assignedQuantity,
  creatorName,
  completed: status,
  id: taskId,
  title,
  description,
  points,
  taskList,
  order,
}) => {
  const { openTaskDataModal } = useModalState();
  const { moveTaskToOtherList, changeTaskOrder } = useTaskListState();
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
          if (dropResult.type === DragAndDropItems.LIST) {
            moveTaskToOtherList(item.taskId, dropResult.listId);
          } else if (dropResult.type === DragAndDropItems.TASK) {
            changeTaskOrder(taskId, dropResult.taskId);
          }
        }
      },
    }),
    [taskId, taskList]
  );
  const [, drop] = useDrop(
    () => ({
      accept: [DragAndDropItems.TASK],
      drop: () => {
        return { type: DragAndDropItems.TASK, taskId };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [taskId, taskList]
  );

  function handleTaskClick() {
    openTaskDataModal({
      assignedQuantity,
      creatorName,
      description,
      points,
      completed: status,
      id: taskId,
      taskList,
      title,
      order,
    });
  }

  return (
    <div ref={drop}>
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
          <TaskCardStatus completed={status === true} />
        </div>
      </div>
    </div>
  );
};
