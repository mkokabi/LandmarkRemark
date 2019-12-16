import * as Reducers from "./reducers";
import { IUserInfo } from "../services/userService";
import { INote } from "../services/noteService";

export interface LoginState {
  IsLoggedIn: boolean;
  UserInfo?: IUserInfo;
  Error?: string;
}

export interface NoteState {
  IsNoteModalOpen: boolean;
  CurrentNote?: INote;
  Notes: INote[];
}

// The top-level state object
export interface ApplicationState {
  loginState: LoginState | undefined;
  noteState: NoteState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  LoginResults: Reducers.reducer,
  UpdateProfile: Reducers.updateProfileReducer,
  Notes: Reducers.noteReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
