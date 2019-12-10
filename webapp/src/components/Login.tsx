import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { userActions } from "../store/actions";
import { IInputs } from "../services/userService";

const Login = () => {
  const useLoginForm = (callback: any) => {
    const [inputs, setInputs] = useState<IInputs>({
      username: "",
      password: ""
    });
    const handleSubmit = (event: any) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleInputChange = (event: any) => {
      event.persist();
      setInputs(inputs => ({
        ...inputs,
        [event.target.name]: event.target.value
      }));
    };
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  };

  const dispatch = useDispatch();

  const loginCallback = () => {
    dispatch(userActions.login(inputs.username, inputs.password));
  };

  const { inputs, handleInputChange, handleSubmit } = useLoginForm(
    loginCallback
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleInputChange}
            value={inputs.username}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleInputChange}
            value={inputs.password}
          />
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;