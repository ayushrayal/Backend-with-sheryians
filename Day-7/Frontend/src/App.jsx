import axios from "axios"
import { useState } from "react"

const App = () => {
  const [notes, setNotes] = useState([{
    Title:"Note 1",
    Description:"This is the description of note 1"
  },
  {
    Title:"Note 2",
    Description:"This is the description of note 2"
  },
  {
    Title:"Note 3",
    Description:"This is the description of note 3"
  },
  {
    Title:"Note 4",
    Description:"This is the description of note 4"
  },
  {
    Title:"Note 5",
    Description:"This is the description of note 5"
  },
  {
    Title:"Note 6",
    Description:"This is the description of note 6"
  }
  ]);

  axios.get("http://localhost:5000/api/notes")
  .then((res)=>{
    console.log(res.data);
  })
  return (
    <>
    <div className="notes">
     {
      notes.map((note, index) => {
       return <div className="note" key={index}>
       <h2>{note.Title}</h2>
      <p>{note.Description}</p>
     </div>
      })}
    </div>
    </>
  )
}

export default App
