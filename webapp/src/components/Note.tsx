import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../store/actions";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { NoteState } from "../store";

const Note = (props: NoteState) => {
  const useNoteForm = (callback: any) => {
    useEffect(() => {
      setNote( {body: props.CurrentNote ? props.CurrentNote.body : "", x: 0, y: 0} );
    }, []);
    const [note, setNote] = useState({
      body: "",
      x: 0,
      y: 0
    });
    const handleSubmit = (event: any) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleInputChange = (event: any) => {
      event.persist();
      setNote(inputs => ({
        ...inputs,
        [event.target.name]:
          event.target.type === "number"
            ? parseFloat(event.target.value)
            : event.target.value
      }));
    };
    return {
      handleSubmit,
      handleInputChange,
      Note: note
    };
  };

  const dispatch = useDispatch();

  const updateCallback = () => {
    dispatch(noteActions.takeNote(note.x, note.y, note.body));
  };

  const { Note: note, handleInputChange, handleSubmit } = useNoteForm(
    updateCallback
  );

  const close = () => {
    dispatch({ type: "TAKE_NOTE_CLOSE_ACTION", isNoteModalOpen: false });
  };

  const closeBtn = (
    <button className="close" onClick={close}>
      &times;
    </button>
  );

  return (
    <>
      <Modal isOpen={props.IsNoteModalOpen}>
        <ModalHeader close={closeBtn}>Note</ModalHeader>
        <ModalBody>
          <h2>Note ({props.CurrentNote && props.CurrentNote.id})</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
                <label>X</label>
                <input
                  type="number"
                  name="x"
                  required
                  onChange={handleInputChange}
                  value={props.CurrentNote ? props.CurrentNote.x : 0}
                />
              </div>
              <div className="form-group">
                <label>Y</label>
                <input
                  type="number"
                  name="y"
                  required
                  onChange={handleInputChange}
                  value={props.CurrentNote ? props.CurrentNote.y : 0}
                />
              </div>
              <div className="form-group">
                <label>Note</label>
                <input
                  type="text"
                  name="body"
                  required
                  onChange={handleInputChange}
                  // value={props.CurrentNote? props.CurrentNote.body : ""}
                  value={note.body}
                />
              </div>
            </div>
            <button type="submit">Save</button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Note;
