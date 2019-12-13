import { Action, Reducer } from "redux";
import { LoginState, NoteState } from ".";
import { KnownAction } from "./actions";

const unloadedState: LoginState = {
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

export const updateProfileReducer: Reducer = (
  state: LoginState | undefined,
  incomingAction: Action
): LoginState => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "UPDATE_PROFILE_SUCCESS":
      return {
        UserInfo: {
          firstName: action.firstname,
          lastName: action.lastname,
          token: ""
        },
        IsLoggedIn: true
      };
    case "UPDATE_PROFILE_FAILED":
      return {
        IsLoggedIn: true
      };
    default:
      return {
        IsLoggedIn: true
      };
  }
};

export const noteReducer: Reducer<NoteState> = (
  state: NoteState | undefined,
  incomingAction: Action
): NoteState => {
  if (state === undefined) {
    return {
      CurrentNote: { id: 0, x: 0, y: 0, body: "" },
      IsNoteModalOpen: false
    };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "TAKE_NOTE_CLICKED_ACTION":
      return {
        IsNoteModalOpen: true,
        CurrentNote: {
          id: 0,
          x: action.x,
          y: action.y,
          body: ""
        }
      };
    case "TAKE_NOTE_CLOSE_ACTION":
      return {
        IsNoteModalOpen: false,
        CurrentNote: {
          id: 0,
          x: 0,
          y: 0,
          body: ""
        }
      };
    default:
      return state;
  }
};
