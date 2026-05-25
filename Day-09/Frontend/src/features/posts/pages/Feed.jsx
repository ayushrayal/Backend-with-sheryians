import Navbar from "../components/Navbar"
import { Post } from "../components/Post"
import { usePost } from "../hooks/usePost"
import "../style/feed.scss"
const Feed = () => {
  const { feedPosts, loading } = usePost()
  if (loading) {
    return (<main >
      <h1>Loading...</h1>
    </main>
    )
  }
  return (
    <main className='feed-page'>
      <Navbar/>
      <div className="feed">
        <div className="posts">{
          feedPosts.map((post) => {
            return <Post key={post._id} post={post} />
          })
        }
        </div>
      </div>
    </main>
  )
}

export default Feed