export function createPortalsPlaceholder() {
  const taskListsOptionModalPortal = document.createElement("div");
  taskListsOptionModalPortal.id = "task-list-option-modal";
  document.body.appendChild(taskListsOptionModalPortal);

  const taskModalPortal = document.createElement("div");
  taskModalPortal.id = "task-option-modal";
  document.body.appendChild(taskModalPortal);

  const editUserPortal = document.createElement("div");
  editUserPortal.id = "edit-user-modal";
  document.body.appendChild(editUserPortal);

  const createTaskPortal = document.createElement("div");
  createTaskPortal.id = "create-task-modal";
  document.body.appendChild(createTaskPortal);

  const createListPortal = document.createElement("div");
  createListPortal.id = "create-task-list-modal";
  document.body.appendChild(createListPortal);

  const editBoardPortal = document.createElement("div");
  editBoardPortal.id = "edit-board-modal";
  document.body.appendChild(editBoardPortal);

  const boardMenuPortal = document.createElement("div");
  boardMenuPortal.id = "board-menu";
  document.body.appendChild(boardMenuPortal);
}
