import { handleResponse } from "./helpers";

export interface IInputs {
  username: string;
  password: string;
}

export interface IUserInfo {
  token: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface ISignupInfo extends IInputs {
  email: string;
}

export const userService = {
  signup (email: string, username: string, password: string): Promise<number> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password })
    };
    return fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/User`,
      requestOptions
    )
      .then(handleResponse)
      .then(() => {
        return 1;
      });
  },
  login(username: string, password: string): Promise<IUserInfo> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: username, password })
    };
    return fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/User/Login`,
      requestOptions
    )
      .then(handleResponse)
      .then((user: IUserInfo) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        return {
          displayName: user.displayName,
          token: user.token
        } as IUserInfo;
      });
  },

  logout() {
    localStorage.removeItem("user");
  },

  getProfile(): Promise<IUserInfo> {
    var localStoredUser = localStorage.getItem("user");
    if (localStoredUser == null) {
      return Promise.reject("Not logged in");
    }
    var user = JSON.parse(localStoredUser);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      }
    };

    return fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/User`,
      requestOptions
    )
      .then(handleResponse)
      .then((user: { firstName: any; lastName: any; token: any }) => {
        return {
          firstName: user.firstName,
          lastName: user.lastName
        } as IUserInfo;
      });
  },

  updateProfile(firstname: string, lastname: string): Promise<number> {
    var localStoredUser = localStorage.getItem("user");
    if (localStoredUser == null) {
      return Promise.reject("Not logged in");
    }
    var user = JSON.parse(localStoredUser);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      },
      body: JSON.stringify({ firstName: firstname, lastName: lastname })
    };

    return fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/User`,
      requestOptions
    )
      .then(handleResponse)
      .then(() => {
        return 1;
      });
  }
};
