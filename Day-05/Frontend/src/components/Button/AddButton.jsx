import React from 'react'
import '../Button/Button.css'
const AddButton = (props) => {
  return (
    <div className='buttonNav'><button onClick={
     ()=>{
      props.setShowModel(true)
     }
    }>Add Task</button></div>
  )
}

export default AddButton