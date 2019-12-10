import { userService, IUserInfo } from "../services/userService";
import { AppThunkAction } from ".";
import { history } from "../.";

export type KnownAction = LoginAction | LoginSuccessAction | LoginFailedAction;

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

export const userActions = {
  login: (
    username: string,
    password: string
  ): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "LOGIN_ACTION", username, password });

    userService.login(username, password).then(
      user => {
        dispatch({ type: "LOGIN_SUCCESS", userInfo: user });
        history.push('/');
      },
      error => {
        dispatch({ type: "LOGIN_FAILED" });
      }
    );
  }
};