import React, { useEffect, useRef, useState, useContext } from "react";
import notecontext from "./context/notes/notecontext";
import Noteitem from "./Noteitem";
import "../App.css";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(notecontext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } 
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    etag: "",
    edescription: ""
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      etag: currentNote.tag,
      edescription: currentNote.description
    });
  };

  
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.etag, note.edescription);
    refClose.current.click();
    props.showAlert("Updated","success");
  };
  
  const onChange = (e) => {
    setNote({...note,[e.target.id]:e.target.value,[e.target.name]:e.target.value});
  };


  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{color:'black'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Editing
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Caption
                  </label>
                  <input
                  
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={3}
                    placeholder="New Title..."
                    
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    placeholder="New Tag..."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    File
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
               <button
               disabled={
                note.etitle.length < 3 || note.etag.length < 1
              }
                onClick={handleClick}
                type="button"
                className="btn btn-success"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <h2 id="kuchhbhi" className="my-4">Your Memes</h2>
      <div className="container mx-6">
        {notes.length === 0 && "No notes to display"}
      </div>
      <div className="row">
        {Array.from(notes).map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
