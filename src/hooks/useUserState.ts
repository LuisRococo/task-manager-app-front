import { useEffect } from "react";
import { useTokenState } from "./useTokenState";
import { userState } from "../appState/userState";
import { useRecoilState } from "recoil";
import { client } from "../components/wrappers/ApolloConfig";
import { patchUserQuerie } from "../queries/userQueries";

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

  async function patchUserData(
    id: number,
    firstName: string,
    lastName: string
  ) {
    if (!user.userData) return;

    const queryResult = await client.mutate({
      mutation: patchUserQuerie,
      variables: {
        id,
        firstName,
        lastName,
      },
    });

    setUser({ userData: { ...user.userData, firstName, lastName } });

    return queryResult.data.patchUser;
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

  return { user, logout, patchUserData };
};
