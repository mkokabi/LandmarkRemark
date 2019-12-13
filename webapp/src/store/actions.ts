import { userService, IUserInfo } from "../services/userService";
import { AppThunkAction } from ".";
import { history } from "../.";
import { noteService } from "../services/noteService";

export type KnownAction =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | UpdateprofileAction
  | UpdateProfileSuccessAction
  | UpdateprofileFailedAction
  | TakeNoteClickedAction
  | NoteClickedAction
  | NoteLoadedAction
  | TakeNoteCloseAction
  | TakeNoteSubmittedAction
  | TakeNoteSuccessAction
  | TakeNoteFailedAction;

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

interface TakeNoteClickedAction {
  type: "TAKE_NOTE_CLICKED_ACTION";
  x: number;
  y: number;
  isNoteModalOpen: boolean;
}

interface NoteClickedAction {
  type: "NOTE_CLICKED_ACTION";
  id: number;
  isNoteModalOpen: boolean;
}

interface NoteLoadedAction {
  type: "NOTE_LOADED_ACTION";
  id: number;
  x: number;
  y: number;
  body: string;
}

interface TakeNoteCloseAction {
  type: "TAKE_NOTE_CLOSE_ACTION";
  isNoteModalOpen: boolean;
}

interface TakeNoteSubmittedAction {
  type: "TAKE_NOTE_SUBMITTED_ACTION";
  id: number;
  x: number;
  y: number;
  body: string;
}

interface TakeNoteSuccessAction {
  type: "TAKE_NOTE_SUCCESS";
}

interface TakeNoteFailedAction {
  type: "TAKE_NOTE_FAILED";
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
  ): AppThunkAction<KnownAction> => dispatch => {
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

export const noteActions = {
  noteClicked: (id: number): AppThunkAction<KnownAction> => dispatch => {
    dispatch({
      type: "NOTE_CLICKED_ACTION",
      id: id,
      isNoteModalOpen: true
    });
    noteService.getNote(id).then(data =>
      dispatch({
        type: "NOTE_LOADED_ACTION",
        id,
        x: data.x,
        y: data.y,
        body: data.body
      })
    );
  },
  takeNoteClicked: (
    x: number,
    y: number
  ): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "TAKE_NOTE_CLICKED_ACTION", x, y, isNoteModalOpen: true });
  },
  takeNote: (
    id: number,
    x: number,
    y: number,
    body: string
  ): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "TAKE_NOTE_SUBMITTED_ACTION", id, x, y, body });
    if (id === 0) {
      noteService.takeNote(x, y, body).then(
        () => {
          dispatch({ type: "TAKE_NOTE_SUCCESS" });
          history.push("/");
        },
        error => {
          dispatch({ type: "TAKE_NOTE_FAILED" });
        }
      );
    } else {
      noteService.updateNote(id, x, y, body).then(
        () => {
          dispatch({ type: "TAKE_NOTE_SUCCESS" });
          history.push("/");
        },
        error => {
          dispatch({ type: "TAKE_NOTE_FAILED" });
        }
      );
    }
  }
};
