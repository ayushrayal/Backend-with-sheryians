import React from 'react'
import AddButton from './components/Button/AddButton'
import NoteModel from "./components/AddNotemodel/NoteModel";
import { useState } from 'react';
import NoteList from './components/NoteList/NoteList';
import axios from "axios";
const App = () => {
  const [showModel, setShowModel] = useState(false);
  const [notes, setNotes] = useState([{
    "title":"first note",
    "description":"this is my first note"
  },
  {
    "title":"second note",
    "description":"this is my second note"
  }]);

  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.notes);
  })

  const addNote = async(title,description)=>{
    axios.post("http://localhost:3000/api/notes",{
      title,
      description
    })
    .then((res)=>{
      setNotes([...notes, res.data.note]);
      setShowModel(false);
    })
  }
  return (
    <div className='main'><AddButton setShowModel = {setShowModel}/>
    {showModel && <NoteModel setShowModel = {setShowModel} setNotes={setNotes} addNote={addNote}/>}
    <NoteList notes={notes}/>
    </div>
  )
}

export default App