import React from 'react'
import {useState, useRef} from 'react'
import '../style/createPost.scss'
import {usePost} from '../hooks/usePost'
import { useNavigate } from 'react-router-dom'
const CreatePost = () => {
  const {createPost} = usePost()
  const [caption, setCaption] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageFile = fileInputRef.current.files[0]
    await createPost(imageFile,caption)
    navigate("/home")
    }
  return (
    <main className='createPost'><form>
      <input
        type="file"
        id="file"
        placeholder="Upload Image"
        ref={fileInputRef}
      />
      <input
        type="text"
        placeholder="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleSubmit}>Create Post</button>
    </form></main>
  )
}

export default CreatePost