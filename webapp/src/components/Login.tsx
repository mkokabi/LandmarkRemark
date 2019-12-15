import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { userActions } from "../store/actions";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useHistory, useParams } from "react-router";

const Login = () => {
  let { signup } = useParams();

  const useLoginForm = (callback: any) => {
    const [inputs, setInputs] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      err: false
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
        [event.target.name]: event.target.value,
        ["err"]:
          inputs.password !== "" &&
          event.target.name === "confirmPassword" &&
          inputs.password !== event.target.value
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
    if (signup) {
      dispatch(userActions.signup(inputs.email, inputs.username, inputs.password));
    } else {
      dispatch(userActions.login(inputs.username, inputs.password));
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useLoginForm(
    loginCallback
  );

  const [modal, setModal] = useState(true);

  const history = useHistory();

  const closeBtnClicked = () => {
    setModal(false);
    history.push("/");
  };

  const closeBtn = (
    <button className="close" onClick={closeBtnClicked}>
      &times;
    </button>
  );

  return (
    <>
      <Modal isOpen={modal}>
        <ModalHeader close={closeBtn}>Login</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              {signup && (
                <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  required
                  onChange={handleInputChange}
                  value={inputs.email}
                />
              </div>
              )}
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
              {signup && (
                <>
                  <div className="form-group">
                    <label>Retype</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      onChange={handleInputChange}
                      value={inputs.confirmPassword}
                    />
                  </div>
                  {inputs.err && <p>Password doesn't match</p>}
                </>
              )}
            </div>
            <button type="submit" disabled={inputs.err}>
              {signup ? "Signup" : "Login"}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Login;
