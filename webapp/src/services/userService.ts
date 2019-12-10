import { handleResponse } from "./helpers";

export interface IInputs {
  username: string;
  password: string;
}

export interface IUserInfo {
  token: string;
  firstName: string;
  lastName: string;
}

export const userService = {
  login(username: string, password: string): Promise<IUserInfo> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    };

    return fetch(
      `${process.env.REACT_APP_SECURITY_BACKEND_API_URL}/Auth/Login`,
      requestOptions
    )
      .then(handleResponse)
      .then((user: { firstName: any; lastName: any; token: any }) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        return {
          firstName: user.firstName,
          lastName: user.lastName,
          token: user.token
        } as IUserInfo;
      });
  },

  getProfile(username: string): Promise<IUserInfo> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    };

    return fetch(
      `${process.env.REACT_APP_SECURITY_BACKEND_API_URL}/Auth/Login`,
      requestOptions
    )
      .then(handleResponse)
      .then((user: { firstName: any; lastName: any; token: any }) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        return {
          firstName: user.firstName,
          lastName: user.lastName,
          token: user.token
        } as IUserInfo;
      });
  }
};