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
    case "LOGOUT_ACTION":
      return unloadedState;
    case "LOGIN_FAILED":
      return {
        IsLoggedIn: false,
        Error: action.error
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
          displayName: action.firstname,
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
      IsNoteModalOpen: false,
      Notes: []
    };
  }
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case "GET_NOTES_ACTION":
      return {
        Notes: state.Notes,
        IsNoteModalOpen: false
      };
    case "GET_NOTE_SUCCESS_ACTION":
      return {
        Notes: action.notes,
        IsNoteModalOpen: false
      };
    case "TAKE_NOTE_CLICKED_ACTION":
      return {
        IsNoteModalOpen: true,
        Notes: state.Notes,
        CurrentNote: {
          id: 0,
          x: action.x,
          y: action.y,
          body: ""
        }
      };
    case "NOTE_CLICKED_ACTION":
      return {
        IsNoteModalOpen: true,
        Notes: state.Notes,
        CurrentNote: {
          id: action.id,
          x: 0,
          y: 0,
          body: ""
        }
      };
    case "NOTE_LOADED_ACTION":
      return {
        IsNoteModalOpen: true,
        Notes: state.Notes,
        CurrentNote: {
          id: action.id,
          x: action.x,
          y: action.y,
          body: action.body
        }
      };
    case "TAKE_NOTE_SUCCESS":
      return {
        Notes: action.added
          ? [
              ...state.Notes,
              { id: action.id, x: action.x, y: action.y, body: action.body }
            ]
          : [
              ...state.Notes.filter(n => n.id === action.id),
              { id: action.id, x: action.x, y: action.y, body: action.body }
            ],
        IsNoteModalOpen: false
      };
    case "TAKE_NOTE_CLOSE_ACTION":
      return {
        Notes: state.Notes,
        IsNoteModalOpen: false
      };
    default:
      return state;
  }
};
