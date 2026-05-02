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
  return (
    <div className='main'><AddButton setShowModel = {setShowModel}/>
    {showModel && <NoteModel setShowModel = {setShowModel} setNotes={setNotes}/>}
    <NoteList notes={notes}/>
    </div>
  )
}

export default App