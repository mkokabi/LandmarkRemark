import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginState } from "../store";
// import { noteService } from "../services/noteService";
import { noteActions } from "../store/actions";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Note = (loginResults: LoginState) => {
  const useNoteForm = (callback: any) => {
    const [note, setNote] = useState({
      body: "",
      x: 0,
      y: 0
    });
    // useEffect(() => {
    //   noteService.takeNote(note.x, note.y, note.body);
    // }, []);
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

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Note
        </ModalHeader>
        <ModalBody>
          <h2>Note</h2>
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
