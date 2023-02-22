import { atom } from "recoil";

export const boardState = atom<IBoardState | undefined>({
  key: "board-page-state",
  default: undefined,
});
