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

    setUser({
      userData: {
        id: responseData.id,
        email: responseData.email,
        firstName: responseData.first_name,
        lastName: responseData.last_name,
        authType: responseData.authorization_tier,
      },
    });
  }

  async function initUser() {
    if (userToken.token) {
      await fetchUserData(userToken.token);
    }
  }

  useEffect(() => {
    initUser();
  }, [userToken]);

  return { user };
};
