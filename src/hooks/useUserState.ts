import { useEffect } from "react";
import { useTokenState } from "./useTokenState";
import { userState } from "../appState/userState";
import { useRecoilState } from "recoil";

export const useUserState = () => {
  const { userToken, removeTokenFromLocalStorage, redirectToLogin } =
    useTokenState();
  const [user, setUser] = useRecoilState(userState);

  async function fetchUserData(token: string) {
    const userDataURL = "http://localhost:3000/current_user";

    const response = await fetch(userDataURL, {
      headers: {
        Authorization: token,
      },
    });

    if (response.status !== 200) {
      alert("There was an error, login again");
      removeTokenFromLocalStorage();
      redirectToLogin();
      return;
    }

    const responseData = await response.json();
    const {
      id,
      email,
      first_name: firstName,
      last_name: lastName,
      authorization_tier: authType,
    } = responseData;

    setUser({
      userData: {
        id,
        email,
        firstName,
        lastName,
        authType,
      },
    });
  }

  async function initUser() {
    if (userToken.token) {
      await fetchUserData(userToken.token);
    }
  }

  function logout() {
    removeTokenFromLocalStorage();
    redirectToLogin();
  }

  useEffect(() => {
    initUser();
  }, [userToken]);

  return { user, logout };
};
