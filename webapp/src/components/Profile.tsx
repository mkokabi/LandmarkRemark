import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { LoginState } from "../store";
import { userService } from "../services/userService";
import { userActions } from "../store/actions";

const Profile = (loginResults: LoginState) => {
  const useProfileForm = (callback: any) => {
    const [profile, setProfile] = useState({
      firstName: "",
      lastName: ""
    });
    useEffect(() => {
      userService.getProfile().then(_profile => setProfile(_profile));
    }, []);
    const handleSubmit = (event: any) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleInputChange = (event: any) => {
      event.persist();
      setProfile(inputs => ({
        ...inputs,
        [event.target.name]: event.target.value
      }));
    };
    return {
      handleSubmit,
      handleInputChange,
      profile
    };
  };

  const dispatch = useDispatch();

  const updateCallback = () => {
    dispatch(userActions.updateProfile(profile.firstName, profile.lastName));
  };

  const { profile, handleInputChange, handleSubmit } = useProfileForm(
    updateCallback
  );

  return (
    <>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              required
              onChange={handleInputChange}
              value={profile.firstName}
            />
          </div>
          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              required
              onChange={handleInputChange}
              value={profile.lastName}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default connect((state: any) => {
  return { loginResults: state.LoginResults };
})(Profile as any);
