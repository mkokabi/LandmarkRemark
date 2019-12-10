import * as React from "react";
import { connect } from "react-redux";
import { LoginState } from "../store";
import { userActions } from "../store/actions";
import { IUserInfo } from "../services/userService";

type HomeProps = LoginState & typeof userActions;

class Home extends React.PureComponent<HomeProps> {
  //const Home = () => {
  public render() {
    return (
      <div>
        <h2>Home</h2>
        <p>
          {this.props.IsLoggedIn
            ? "Logged in, Hi " + (this.props.UserInfo as IUserInfo).firstName
            : "Please log in"}
        </p>
      </div>
    );
  }
}

export default connect((state: any) => {
  return state.LoginResults;
}, userActions)(Home as any);