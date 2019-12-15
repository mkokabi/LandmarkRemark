import { userService, IUserInfo } from "../services/userService";
import { AppThunkAction } from ".";
import { history } from "../.";
import { noteService, INote } from "../services/noteService";

export type KnownAction =
  | SignupAction
  | SignupSuccessAction
  | SignupFailedAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction
  | UpdateprofileAction
  | UpdateProfileSuccessAction
  | UpdateprofileFailedAction
  | GetNotesAction
  | GetNotesSuccessAction
  | TakeNoteClickedAction
  | NoteClickedAction
  | NoteLoadedAction
  | TakeNoteCloseAction
  | TakeNoteSubmittedAction
  | TakeNoteSuccessAction
  | TakeNoteFailedAction;

interface SignupAction {
  type: "SIGNUP_ACTION";
  email: string;
  username: string;
  password: string;
}

interface SignupSuccessAction {
  type: "SIGNUP_SUCCESS";
}

interface SignupFailedAction {
  type: "SIGNUP_FAILED";
}

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

interface LogoutAction {
  type: "LOGOUT_ACTION";
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

interface GetNotesAction {
  type: "GET_NOTES_ACTION";
  x: number;
  y: number;
}

interface GetNotesSuccessAction {
  type: "GET_NOTE_SUCCESS_ACTION";
  notes: INote[];
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
  added: boolean;
  id: number;
  x: number;
  y: number;
  body: string;
}

interface TakeNoteFailedAction {
  type: "TAKE_NOTE_FAILED";
}

export const userActions = {
  signup: (
    email: string,
    username: string,
    password: string
  ): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "SIGNUP_ACTION", email, username, password });

    userService.signup(email, username, password).then(
      user => {
        dispatch({ type: "SIGNUP_SUCCESS" });
        history.push("/");
      },
      error => {
        dispatch({ type: "SIGNUP_FAILED" });
      }
    );
  },

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

  logout: (): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "LOGOUT_ACTION" });
    userService.logout();
    history.push("/");
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
  GetNotesAction: (
    x: number,
    y: number
  ): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "GET_NOTES_ACTION", x, y });
    noteService.getNotes(x, y).then(data =>
      dispatch({
        type: "GET_NOTE_SUCCESS_ACTION",
        notes: data
      })
    );
  },
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
        (newId: number) => {
          dispatch({
            type: "TAKE_NOTE_SUCCESS",
            added: true,
            id: newId,
            x,
            y,
            body
          });
          history.push("/");
        },
        error => {
          dispatch({ type: "TAKE_NOTE_FAILED" });
        }
      );
    } else {
      noteService.updateNote(id, x, y, body).then(
        () => {
          dispatch({ type: "TAKE_NOTE_SUCCESS", added: false, id, x, y, body });
          history.push("/");
        },
        error => {
          dispatch({ type: "TAKE_NOTE_FAILED" });
        }
      );
    }
  }
};
