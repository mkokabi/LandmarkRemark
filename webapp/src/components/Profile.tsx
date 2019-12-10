import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { LoginState } from "../store";
import { userService, IUserInfo } from "../services/userService";

const Profile = (loginResults: LoginState) => {
  const [profile, setProfile] = useState({} as IUserInfo);
  useEffect(() => {
    userService.getProfile("username").then(_profile => setProfile(_profile));
  }, []);
  return (
    <div>
      <h2>Jobs</h2>
      {loginResults.IsLoggedIn}
      <Container>
        {/* {jobs.map((job: IJobInfo) => (
          <Row>
            <Col sm={{ size: 2, offset: 3 }}>Id: {job.jobId}</Col>
            <Col sm={{ size: 2 }}>Code: {job.jobCode}</Col>
            <Col sm={{ size: 3 }}>Description: {job.description}</Col>
          </Row>
        ))} */}
      </Container>
    </div>
  );
};

// export default Job;
export default connect((state: any) => {
  return { loginResults: state.LoginResults };
})(Profile as any);