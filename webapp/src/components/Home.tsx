import * as React from "react";
import { connect } from "react-redux";
import { LoginState } from "../store";
import { userActions } from "../store/actions";
import { IUserInfo } from "../services/userService";
import NotesMap from "./NotesMap";

type HomeProps = LoginState & typeof userActions;

class Home extends React.PureComponent<HomeProps> {
  //const Home = () => {
  public render() {
    return (
      <div>
        <p>
          {this.props.IsLoggedIn
            ? "Logged in, Hi " + (this.props.UserInfo as IUserInfo).displayName
            : "Please log in"}
        </p>
        <NotesMap></NotesMap>
      </div>
    );
  }
}

export default connect((state: any) => {
  return state.LoginResults;
}, userActions)(Home as any);
