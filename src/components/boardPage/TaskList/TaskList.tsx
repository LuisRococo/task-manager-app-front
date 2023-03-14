import React from "react";
import "./TaskList.scss";
import { ITaskListState } from "../../../interfaces/taskList";
import { EmptyTaskListCard } from "./EmptyTaskListCard";
import { TaskCard } from "../TaskCard.tsx/TaskCard";
import { useDrop } from "react-dnd";
import { DragAndDropItems } from "../../../utils/dragAndDropTypes";
import { TaskDraggableIcon } from "./TaskDraggableIcon";

export interface ITaskList {
  taskList: ITaskListState;
  onClick: (taskList: ITaskListState) => void;
}

export const TaskList: React.FC<ITaskList> = ({ taskList, onClick }) => {
  const { tasks, color, name, priority, id: listId } = taskList;
  let headerStyle: any = {
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
  };
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [DragAndDropItems.TASK, DragAndDropItems.LIST],
    drop: () => {
      return { type: DragAndDropItems.LIST, listId };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  if (canDrop && !isOver) {
    headerStyle = { ...headerStyle, backgroundColor: "#f6dfa8" };
  } else if (isOver) {
    headerStyle = { ...headerStyle, backgroundColor: "#c3f6b8" };
  }

  return (
    <div>
      <TaskDraggableIcon listId={listId} />
      <div className="task-list mx-2 col-inside-scroll pb-4 h-100">
        <div
          className="w-100 mb-5"
          onClick={() => {
            onClick(taskList);
          }}
          data-testid={`task-list-header-${listId}`}
        >
          <div
            ref={drop}
            className="w-100 rounded-top p-3 text-center border"
            style={headerStyle}
          >
            <p data-testid="task-list-title-text" className="h6 m-0">
              {name}
            </p>
            <small className="text-muted">{priority}° Priority</small>
          </div>
          <div
            className="task-list-bottom rounded-bottom"
            style={{ backgroundColor: color }}
          ></div>
        </div>

        <div>
          {tasks.length == 0 && <EmptyTaskListCard />}
          {tasks.length != 0 &&
            tasks.map((task) => {
              return <TaskCard key={task.id} {...task} />;
            })}
        </div>
      </div>
    </div>
  );
};
