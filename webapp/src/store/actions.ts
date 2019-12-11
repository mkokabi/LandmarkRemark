import { userService, IUserInfo } from "../services/userService";
import { AppThunkAction } from ".";
import { history } from "../.";

export type KnownAction =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | UpdateprofileAction
  | UpdateProfileSuccessAction
  | UpdateprofileFailedAction;

interface LoginAction {
  type: "LOGIN_ACTION";
  username: string;
  password: string;
}

interface LoginSuccessAction {
  type: "LOGIN_SUCCESS";
  userInfo: IUserInfo;
}

interface LoginFailedAction {
  type: "LOGIN_FAILED";
}

interface UpdateprofileAction {
  type: "UPDATE_PROFILE_ACTION";
  firstname: string;
  lastname: string;
}

interface UpdateProfileSuccessAction {
  type: "UPDATE_PROFILE_SUCCESS";
  firstname: string;
  lastname: string;
}

interface UpdateprofileFailedAction {
  type: "UPDATE_PROFILE_FAILED";
}

export const userActions = {
  login: (
    username: string,
    password: string
  ): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "LOGIN_ACTION", username, password });

    userService.login(username, password).then(
      user => {
        dispatch({ type: "LOGIN_SUCCESS", userInfo: user });
        history.push("/");
      },
      error => {
        dispatch({ type: "LOGIN_FAILED" });
      }
    );
  },

  updateProfile: (
    firstname: string,
    lastname: string
  ): AppThunkAction<KnownAction> => 
  dispatch => {
    dispatch({ type: "UPDATE_PROFILE_ACTION", firstname, lastname });

    userService.updateProfile(firstname, lastname).then(
      user => {
        dispatch({ type: "UPDATE_PROFILE_SUCCESS", firstname, lastname });
        history.push("/");
      },
      error => {
        dispatch({ type: "UPDATE_PROFILE_FAILED" });
      }
    );
  }
};
