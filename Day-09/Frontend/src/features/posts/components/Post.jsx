import React from 'react'
import "../style/feed.scss"
export const Post = ({ post, likePost, unlikePost }) => {
  const profileImage = post.userId?.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107"
  const username = post.userId?.username || "Unknown User"
  return (
    <div className="post">
      <div className="user-info">
        <div className="img-container">
          <img src={profileImage} alt="Profile Image" />
        </div>
        <div className="username">{username}</div>
      </div>
      <div className="post-content">
        <img src={post.imgUrl} alt="Image" />
      </div>
      <div className="bottom-section">
        <div className="left"><button onClick={() => {
          if (post.isliked) {
            console.log("unliking post with id:", post._id)
            unlikePost(post._id)
          } else {
            console.log("liking post with id:", post._id)
            likePost(post._id)
          }
        }}>{
            post.isliked ? (
              <svg className='like' xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="24"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                width="24"
              >
                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
              </svg>
            )
          }

          <span>{post.likesCount}</span>
        </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path></svg>
          </button>
          <button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.4144 9.00015L12.0002 2.58594L5.58594 9.00015H11V16H13V9.00015H18.4144ZM3 14V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V14H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V14H3Z"></path></svg>
          </button></div>
        <div className="right"><button><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22H6.5C4.567 22 3 20.433 3 18.5ZM19 20V17H6.5C5.67157 17 5 17.6716 5 18.5C5 19.3284 5.67157 20 6.5 20H19ZM10 4H6C5.44772 4 5 4.44772 5 5V15.3368C5.45463 15.1208 5.9632 15 6.5 15H19V4H17V12L13.5 10L10 12V4Z"></path></svg></button></div>
      </div>
      <div className="caption">{post.caption}</div>
    </div>
  )
}

