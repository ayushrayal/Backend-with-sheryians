import axios from "axios"
import { useState, useEffect } from "react"

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");

  function fetchnotes(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data.notes)
    })
  }

  useEffect(()=>{
    fetchnotes()
  },[])

  function handleSubmit(e){
    e.preventDefault()
    const {Title, Description} = e.target.elements

    axios.post("http://localhost:3000/api/notes",{
      Title:Title.value,
      Description:Description.value
    })
    .then(()=>{
      fetchnotes()
    })
  }

  function DeleteNote(NoteId){
    axios.delete('http://localhost:3000/api/notes/'+NoteId)
    .then(()=>{
      fetchnotes()
    })
  }

  // 🔥 UPDATE FUNCTION
  function handleUpdate(id){
    axios.patch("http://localhost:3000/api/notes/"+id,{
      Description: updatedDesc,
      Title: updatedTitle
    })
    .then(()=>{
      fetchnotes()
      setEditingId(null)
    })
  }

  return (
    <>
      {/* FORM */}
      <div className="form-box" onSubmit={handleSubmit}>
        <form className="notes-create-form">
          <input type="text" placeholder="Enter Your Title" name="Title" />
          <input type="text" placeholder="Enter Your Description" name="Description" />
          <button>Submit</button>
        </form>
      </div>

      {/* NOTES LIST */}
      <div className="notes">
        {
          notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                <h2>{note.Title}</h2>
                <p>{note.Description}</p>

                <div className="btnbox">

                  {/* DELETE */}
                  <button onClick={()=>DeleteNote(note._id)}>
                    Delete
                  </button>

                  {/* UPDATE BUTTON */}
                  <button onClick={()=>{
                    setEditingId(note._id);
                    setUpdatedDesc(note.Description);
                    setUpdatedTitle(note.Title);
                  }}>
                    Update
                  </button>

                </div>

                {/* EDIT INPUT SHOW ONLY WHEN SELECTED */}
                {
                  editingId === note._id && (
                    <div className="editbox">
                      <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e)=>setUpdatedTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        value={updatedDesc}
                        onChange={(e)=>setUpdatedDesc(e.target.value)}
                      />
                      <button onClick={()=>handleUpdate(note._id)}>
                        Save
                      </button>
                    </div>
                  )
                }

              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
