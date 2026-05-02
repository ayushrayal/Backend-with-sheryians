import React, { useState } from 'react'
import '../AddNotemodel/NoteModel.css'
const NoteModel = (props) => {
  const [title,settitle] = useState("");
  const [description,setdescription] = useState("");
  return (
    <div className='noteModel'>
        <div className="header"><h1>New Notes</h1></div>
        <input type="text" placeholder='Title' value={title} onChange={(e)=>{
          console.log(e.target.value);
          settitle(e.target.value);
          
        }} />
        <textarea placeholder='Description' value={description} onChange={(e)=>{
          console.log(e.target.value);
          setdescription(e.target.value);
          
        }}></textarea>
        <footer><button onClick={()=>{
          props.setShowModel(false)
        }}>Cancel</button>
        <button>Save</button></footer>
    </div>
  )
}

export default NoteModel