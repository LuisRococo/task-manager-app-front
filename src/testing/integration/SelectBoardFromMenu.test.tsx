/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { MockedProvider } from "@apollo/react-testing";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import App from "../../App";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React, { createRef, useEffect } from "react";
import { userState } from "../../appState/userState";
import { createPortalsPlaceholder } from "../__mocks__/mockData/utils";
import { boardMock1 } from "../__mocks__/mockData/boardStateMocks";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

jest.mock("../../hooks/useTaskListState", () => ({
  useTaskListState: () => {
    return {
      query: (params: any) => ({
        fetchTaskLists: async () => {},
        taskLists: [],
      }),
      taskLists: [],
      fetchTaskLists: () => {},
    };
  },
}));

jest.mock("../../components/wrappers/ApolloConfig", () => ({
  client: {
    query: (params: any) => ({
      data: { board: boardMock1 },
    }),
  },
}));

jest.mock("../../hooks/useTokenState", () => {
  return {
    useTokenState: () => {
      return {
        userToken: "",
        removeTokenFromLocalStorage: () => {},
        redirectToLogin: () => {},
      };
    },
  };
});

jest.mock("../../hooks/useBoardState", () => {
  return {
    useBoardState: () => {
      return {
        fetchUserBoards: () => {
          return [boardMock1];
        },
        fetchBoard: () => {},
        board: boardMock1,
      };
    },
  };
});

const InitData: React.FC = () => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    setUser({
      userData: {
        authType: "Admin",
        email: "email@email.com",
        firstName: "Mock",
        lastName: "Mock",
        id: 1,
      },
    });
  }, []);

  return null;
};

function setup() {
  createPortalsPlaceholder();
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecoilRoot>
        <InitData />
        <App />
      </RecoilRoot>
    </MockedProvider>
  );
}

it("f", async () => {
  setup();

  await waitFor(() => {
    expect(screen.queryByTestId("board-select-pg-cont")).not.toBeNull();
  });

  await waitFor(() => {
    expect(screen.queryByTestId("board-card-title")?.textContent).toBe(
      boardMock1.title
    );
  });

  fireEvent.click(screen.getByTestId("board-card-see-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("board-header-title")?.textContent).toBe(
      boardMock1.title
    );
  });
});
