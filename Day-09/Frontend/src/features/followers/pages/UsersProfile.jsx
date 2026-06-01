import React from 'react'
import '../style/user-profile.scss'
import {useUsers }from '../hooks/useUsers';
const UsersProfile = () => {
    const { followers = [], following = [], othersProfile = [] } = useUsers();
    console.log("Followers:", followers);
    console.log("Following:", following);
    console.log("Others Profile:", othersProfile);
    return (
        <main className='users-profile'>
            <div className="followers-profile">
                < h1 className='UserHeading'>Followers</h1>
                {followers.length === 0 ? <p>No followers yet.</p> : followers.map((follower) => (
                    <div key={follower.followerID} className="card">
                        <img src="https://ik.imagekit.io/ayushrayal/InstaClone/InstaPosts/1779890463417134239010781219224_zGSEkX_x1.jpg" alt={`${follower.followerID}'s profile`} />    
                        <h1 className='username'>{follower.followerID}</h1>
                    </div>
                ))}
            </div>
           <div className="following-profile">
            <h1 className='UserHeading'>Following</h1>
            {following.length === 0 ? <p>Not following anyone yet.</p> : following.map((followed) => (
                <div key={followed.followingID} className="card">
                    <img src="https://ik.imagekit.io/ayushrayal/InstaClone/InstaPosts/1779890463417134239010781219224_zGSEkX_x1.jpg" alt={`${followed.followingID}'s profile`} />
                    <h1 className='username'>{followed.followingID}</h1>
                </div>
            ))}
           </div>
            <div className="others-profile">
                < h1>Others</h1>
                {othersProfile.length === 0 ? <p>No other users found.</p> : othersProfile.map((user) => (
                    <div key={user.username} className="card">
                        <img src={user.profileImage} alt={`${user.username}'s profile`} />
                        <h1 className='username'>{user.username}</h1>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default UsersProfile