import { atom } from "recoil";

export interface ITokenState {
  token: string | null;
}

export const tokenState = atom<ITokenState>({
  key: "token-state",
  default: {
    token: null,
  },
});
