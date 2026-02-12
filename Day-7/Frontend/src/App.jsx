import axios from "axios"
import { useState, useEffect} from "react"

const App = () => {
  const [notes, setNotes] = useState([]);

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
    console.log(Title.value,Description.value);
    axios.post("http://localhost:3000/api/notes",{
      Title:Title.value,
      Description:Description.value})
      .then((res)=>{
        console.log(res.data);
        fetchnotes()
      })
  }

  function DeleteNote(NoteId){
    axios.delete('http://localhost:3000/api/notes/'+NoteId)
    .then(res=>{
      console.log(res.data);
      fetchnotes()
    })
  }
  return (
    <>
    <div className="form-box" onSubmit={handleSubmit}>
      <form className="notes-create-form">
        <input type="text" placeholder="Enter Your Title" name="Title" />
        <input type="text" placeholder="Enter Your Description" name="Description" />
        <button>Submit</button>
      </form>
    </div>
    <div className="notes">
     {
      notes.map((note, index) => {
       return <div className="note" key={index}>
       <h2>{note.Title}</h2>
      <p>{note.Description}</p>
    <div className="btnbox">
      <button onClick={()=>{
        DeleteNote(note._id)
      }}>Delete</button>
      <button>Update</button>
      </div>
     </div>
      })}
    </div>
    </>
  )
}

export default App
