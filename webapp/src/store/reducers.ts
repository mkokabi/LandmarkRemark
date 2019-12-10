import { Action, Reducer } from "redux";
import { LoginState } from ".";
import { KnownAction } from "./actions";

const unloadedState : LoginState = {
  IsLoggedIn: false
};

export const reducer: Reducer<LoginState> = (
  state: LoginState | undefined,
  incomingAction: Action
): LoginState => {
  if (state === undefined) {
    return unloadedState;
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        IsLoggedIn: true,
        UserInfo: action.userInfo
      };
    case "LOGIN_FAILED":
      return {
        IsLoggedIn: false
      };
    default:
      return state;
  }
};