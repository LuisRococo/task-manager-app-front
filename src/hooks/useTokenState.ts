import { useEffect } from "react";
import { tokenState } from "../appState/tokenState";
import { useRecoilState } from "recoil";

export const useTokenState = () => {
  const loginURL = "http://localhost:3000/login";
  const [userToken, setUserToken] = useRecoilState(tokenState);

  function saveTokenToLocalStorage(token: string) {
    window.localStorage.setItem("token", token);
  }

  function getTokenFromLocalStorage() {
    return window.localStorage.getItem("token");
  }

  function removeTokenFromLocalStorage() {
    window.localStorage.removeItem("token");
  }

  function redirectToLogin() {
    location.href = loginURL;
  }

  function init() {
    const searchParams = new URLSearchParams(document.location.search);
    let token = searchParams.get("token");

    if (token === null) {
      token = getTokenFromLocalStorage();
      if (!token) {
        redirectToLogin();
      }
    }

    if (token) {
      saveTokenToLocalStorage(token);
      setUserToken({ token });
    }
  }

  useEffect(() => {
    init();
  }, []);

  return { userToken, removeTokenFromLocalStorage, redirectToLogin };
};
