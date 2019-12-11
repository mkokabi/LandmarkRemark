import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { LoginState } from "../store";
import { noteService, INote } from "../services/noteService";
import { Link } from "react-router-dom";
import MapContainer from "./MapContainer";
import { Marker } from "google-maps-react";

const NotesMap = (loginResults: LoginState) => {
  const [notes, setNotes] = useState([] as INote[]);
  useEffect(() => {
    noteService.getNotes().then(_notes => setNotes(_notes));
  }, []);

  const onMapClicked = (x: number, y: number) => {
    alert("Map clicked on x:" + x + " y: " + y);
  }

  return (
    <div>
      <h2>Notes</h2>
      {loginResults.IsLoggedIn}
      <Container>
        {notes.map((note: INote) => (
          <Row key={note.id}>
            <Col sm={{ size: 3, offset: 2 }}>Note: {note.body}</Col>
            <Col sm={{ size: 2 }}>Username: {note.name}</Col>
            <Col sm={{ size: 1 }}>x: {note.x}</Col>
            <Col sm={{ size: 1 }}>y: {note.y}</Col>
            <Col sm={{ size: 1 }}>
              <Link to={`/TakeNote/${note.id}`}>{note.id}</Link>
            </Col>
          </Row>
        ))}
      </Container>
      <MapContainer onMapClicked={onMapClicked}>
        {notes.map((note: INote) => (
          <Marker
            key={note.id}
            id={note.id}
            position={{
              lat: note.y,
              lng: note.x
            }}
            onClick={() => alert("Note " + note.body)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default connect((state: any) => {
  return { loginResults: state.LoginResults };
})(NotesMap as any);
