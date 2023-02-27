import React from "react";
import { useDrag } from "react-dnd";
import { DragAndDropItems } from "../../../utils/dragAndDropTypes";
import { RiDragMoveLine } from "react-icons/ri";
import "./TaskDraggableIcon.scss";
import { useTaskListState } from "../../../hooks/useTaskListState";

interface TaskDraggableIcon {
  listId: number;
}

export const TaskDraggableIcon: React.FC<TaskDraggableIcon> = ({ listId }) => {
  const { exchangeListPosition, taskLists } = useTaskListState();
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DragAndDropItems.TASK,
      item: { listId },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult() as any;
        if (item && dropResult) {
          exchangeListPosition(item.listId, dropResult.listId);
        }
      },
    }),
    [taskLists]
  );

  return (
    <div
      className="list-drag-icon d-flex justify-content-center mb-3"
      style={{ opacity }}
      ref={dragRef}
    >
      <RiDragMoveLine size={30} />
    </div>
  );
};
