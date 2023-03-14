/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { MockedProvider } from "@apollo/react-testing";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React, { createRef, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { TaskListContainer } from "../../components/boardPage/TaskListContainer/TaskListContainer";
import { taskListState } from "../../appState/taskListState";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

jest.mock("../../components/wrappers/ApolloConfig", () => ({
  client: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutate: (param: any) => ({}),
  },
}));

const StateInitializer: React.FC = () => {
  const [lists, setLists] = useRecoilState(taskListState);

  function addDefaultTaskList() {
    setLists([
      ...lists,
      {
        id: 1,
        color: "#fff",
        name: "Test Task List 1",
        priority: 1,
        tasks: [],
      },
    ]);
  }

  useEffect(() => {
    addDefaultTaskList();
  }, []);

  return null;
};

function setup() {
  const taskListsOptionModalPortal = document.createElement("div");
  taskListsOptionModalPortal.id = "task-list-option-modal";
  document.body.appendChild(taskListsOptionModalPortal);

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecoilRoot>
        <StateInitializer />
        <TaskListContainer />
      </RecoilRoot>
    </MockedProvider>
  );
}

it("TaskList details modal should be visible", async () => {
  setup();

  const taskListHeader = screen.queryByTestId("task-list-header-1");
  const taskListModal = screen.queryByTestId("task-list-modal-container");

  await waitFor(() => {
    expect(taskListHeader).not.toBeNull();
  });

  await waitFor(() => {
    expect(taskListModal).toBeNull();
  });

  fireEvent.click(taskListHeader!);

  await waitFor(() => {
    expect(screen.queryByTestId("task-list-modal-container")).not.toBeNull();
  });
});

it("TaskList details modal should be able to delete task list", async () => {
  setup();

  const taskListHeader = screen.queryByTestId("task-list-header-1");

  fireEvent.click(taskListHeader!);

  await waitFor(async () => {
    expect(screen.queryByTestId("task-list-modal-container")).not.toBeNull();
  });

  const taskListModalDeleteBtn = screen.queryByTestId(
    "task-list-modal-delete-btn"
  );

  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fireEvent.click(taskListModalDeleteBtn!);

  await waitFor(() => {
    expect(screen.queryByTestId("task-list-header-1")).toBeNull();
  });
});
