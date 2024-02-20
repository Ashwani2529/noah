import React, { useContext, useState } from "react";
import "../index.css";
import notecontext from "./context/notes/notecontext";

const AddNote = (props) => {
  const context = useContext(notecontext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    tag: "",
    description: "",
  });
  
  function ctb64(e) {
    var r = new FileReader();
    r.readAsDataURL(e.target.files[0]);
    r.onload = () => {
      setNote({...note ,description:r.result});
      // e.target.value = "";
    };
    r.onerror = (error) => {
      console.log("Error", error);
    };
  }

  const handleClick=(e)=>{
    try{
    e.preventDefault();
    addNote(note.title,note.tag,note.description);
    setNote({title: "",  tag: "",description: ""});
    props.showAlert("File Added","success");
  }
  catch{
    console.log("something went wrong");
  }
};

  return (
    <>
      <div className="container my-5">
        <h1 className="heading">
          <b><i className="bi bi-file-richtext mx-1"></i> Upload New Meme <i className="bi bi-file-richtext mx-1"></i></b>
        </h1>
      </div>
      <div className="container">
        <form id="form">
          <div className="col-sm-6 mx-1">
            <label id="sr-only" htmlFor="title">
            <i className="bi bi-badge-cc mx-2"></i>Caption
            </label>
            <textarea
              className="form-control"
              id="title"
              value={note.title}
              rows="4"
              placeholder=""
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              
              required
            ></textarea>
          </div>
          <div className="col-sm-4 mx-1 my-4">
            <label id="sr-only" htmlFor="tag">
            <i className="bi bi-tags mx-2"></i> Tags
            </label>
            <textarea
              className="form-control"
              value={note.tag}
              id="tag"
              rows="2"
              placeholder="#"
              onChange={(e) => setNote({ ...note, tag: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group col-sm-4 my-4">
            <label id="descriptionLabel" htmlFor="description">
            <i className="bi bi-image mx-2"></i> Image
            </label>
            <input className="photo my-2" accept="image/*" type="file" name="description" onChange={(e)=>{ctb64(e)} }/>
          </div>
         
          <button
            type="submit"
            className="btn btn-primary my-1"
            onClick={handleClick}
          >
            Post <i className="bi bi-plus-circle"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
