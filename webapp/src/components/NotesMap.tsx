import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { LoginState } from "../store";
import { noteService, INote } from "../services/noteService";

const NotesMap = (loginResults: LoginState) => {
  const [notes, setNotes] = useState([] as INote[]);
  useEffect(() => {
    noteService.getNotes().then(_notes => setNotes(_notes));
  }, []);
  return (
    <div>
      <h2>Notes</h2>
      {loginResults.IsLoggedIn}
      <Container>
        {notes.map((note: INote) => (
          <Row>
            <Col sm={{ size: 3, offset: 2 }}>Note: {note.body}</Col>
            <Col sm={{ size: 2 }}>Username: {note.name}</Col>
            <Col sm={{ size: 1 }}>x: {note.x}</Col>
            <Col sm={{ size: 1 }}>y: {note.y}</Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default connect((state: any) => {
  return { loginResults: state.LoginResults };
})(NotesMap as any);
