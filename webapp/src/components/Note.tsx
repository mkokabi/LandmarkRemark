import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "../store/actions";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useParams, useHistory } from "react-router";
import { noteService } from "../services/noteService";

  const Note = () => {
  let { id } = useParams();
  const useNoteForm = (callback: any) => {
    const [note, setNote] = useState({
      body: "",
      x: 0,
      y: 0
    });
    useEffect(() => {
      noteService.getNote(id ? parseInt(id) : 0).then(data => setNote(data));
    }, []);
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

  let history = useHistory();

  const [modal, setModal] = useState(true);
  const close = () => {
    history.push("/");

    setModal(false)
  }

  const closeBtn = (
    <button className="close" onClick={close}>
      &times;
    </button>
  );

  return (
    <>
      <Modal isOpen={modal}>
        <ModalHeader close={closeBtn}>
          Note
        </ModalHeader>
        <ModalBody>
          <h2>Note ({id})</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-group">
                <label>X</label>
                <input
                  type="number"
                  name="x"
                  required
                  onChange={handleInputChange}
                  value={note.x}
                />
              </div>
              <div className="form-group">
                <label>Y</label>
                <input
                  type="number"
                  name="y"
                  required
                  onChange={handleInputChange}
                  value={note.y}
                />
              </div>
              <div className="form-group">
                <label>Note</label>
                <input
                  type="text"
                  name="body"
                  required
                  onChange={handleInputChange}
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

