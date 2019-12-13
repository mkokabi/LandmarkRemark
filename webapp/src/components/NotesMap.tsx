import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { NoteState } from "../store";
import { noteService, INote } from "../services/noteService";
import MapContainer from "./MapContainer";
import { Marker } from "google-maps-react";
import Note from "./Note";
import { noteActions } from "../store/actions";

const NotesMap = (noteState: NoteState) => {
  const [notes, setNotes] = useState([] as INote[]);
  useEffect(() => {
    noteService.getNotes().then(_notes => setNotes(_notes));
  }, []);

  const dispatch = useDispatch();

  const onMapClicked = (x: number, y: number) => {
    dispatch({ type: "TAKE_NOTE_CLICKED_ACTION", x, y, isNoteModalOpen: true });
  };

  const NotesGrid = () => (
    <Container>
      {notes.map((note: INote) => (
        <Row key={note.id}>
          <Col sm={{ size: 3, offset: 2 }}>Note: {note.body}</Col>
          <Col sm={{ size: 2 }}>Username: {note.name}</Col>
          <Col sm={{ size: 1 }}>x: {note.x}</Col>
          <Col sm={{ size: 1 }}>y: {note.y}</Col>
          <Col sm={{ size: 1 }}>
            <Button
              color="link"
              onClick={() => dispatch(noteActions.noteClicked(note.id))}
            >
              {note.id}
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );

  return (
    <div>
      <h2>Notes</h2>
      <NotesGrid></NotesGrid>
      <MapContainer onMapClicked={onMapClicked}>
        {notes.map((note: INote) => (
          <Marker
            key={note.id}
            id={note.id}
            position={{
              lat: note.y,
              lng: note.x
            }}
            onClick={() => dispatch(noteActions.noteClicked(note.id))}
          />
        ))}
      </MapContainer>
      <Note
        IsNoteModalOpen={noteState && noteState.IsNoteModalOpen}
        CurrentNote={noteState && noteState.CurrentNote}
      ></Note>
    </div>
  );
};

export default connect((state: any) => {
  return state.Notes;
})(NotesMap as any);
