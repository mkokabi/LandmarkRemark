import { handleResponse } from "./helpers";

export interface INote {
  id: number,
  x: number,
  y: number,
  name: string;
  body: string;
}

export const noteService = {
  getNotes(): Promise<INote[]> {
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
      `${process.env.REACT_APP_BACKEND_API_URL}/api/Notes?x=-122.13&y=47.68`,
      requestOptions
    )
      .then(handleResponse)
      .then((notes: INote[]) => {
        return notes;
      });
  },

  takeNote(x: number, y: number, body: string): Promise<number> {
    var localStoredUser = localStorage.getItem("user");
    if (localStoredUser == null) {
      return Promise.reject("Not logged in");
    }
    var user = JSON.parse(localStoredUser);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      },
      body: JSON.stringify({ x, y, body })
    };

    return fetch(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/Notes`,
      requestOptions
    )
      .then(handleResponse)
      .then(() => {
        return 1;
      });
  }
};