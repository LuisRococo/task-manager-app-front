import { createRef, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { TaskListContainer } from "../../components/boardPage/TaskListContainer/TaskListContainer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CreateTaskListModal } from "../../components/boardPage/CreateTaskListModal/CreateTaskListModal";
import { useModalState } from "../../hooks/useModalState";
import { MockedProvider } from "@apollo/react-testing";

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

jest.mock("../../components/wrappers/ApolloConfig", () => ({
  client: {
    mutate: (param: any) => ({
      data: {
        createTaskList: {
          id: "10",
          name: param.variables.name,
          color: "#fff",
          priority: 1,
          tasks: [],
        },
      },
    }),
  },
}));

const StateInitializer = () => {
  const { changeCreateTaskListModalVisibility } = useModalState();

  useEffect(() => {
    changeCreateTaskListModalVisibility(true);
  }, []);

  return null;
};

function setup() {
  const taskListsOptionModalPortal = document.createElement("div");
  taskListsOptionModalPortal.id = "task-list-option-modal";
  document.body.appendChild(taskListsOptionModalPortal);

  const createtaskListsModalPortal = document.createElement("div");
  createtaskListsModalPortal.id = "create-task-list-modal";
  document.body.appendChild(createtaskListsModalPortal);

  render(
    <RecoilRoot>
      <MockedProvider mocks={[]} addTypename={false}>
        <>
          <StateInitializer />
          <TaskListContainer />
          <CreateTaskListModal />
        </>
      </MockedProvider>
    </RecoilRoot>
  );
}

it("CreateTaskList modal should be visible", async () => {
  setup();

  const createListContainer = await screen.findByTestId(
    "create-task-modal-container"
  );

  await waitFor(() => {
    expect(createListContainer).toBeDefined();
  });
});

it("CreateTaskList modal should add a new TaskList on submit", async () => {
  setup();

  const newTaskListTitle = "Test Task List 1";

  const taskListSubmitBtn = screen.getByTestId("task-list-modal-submit-btn");

  const inputListName = await screen.getByTestId(
    "create-list-modal-input-title"
  );
  fireEvent.change(inputListName, {
    target: {
      value: newTaskListTitle,
    },
  });

  fireEvent.click(taskListSubmitBtn);

  const taskList = await screen.findByTestId("task-list-title-text");

  await waitFor(() => {
    expect(taskList.textContent).toBe(newTaskListTitle);
  });
});
