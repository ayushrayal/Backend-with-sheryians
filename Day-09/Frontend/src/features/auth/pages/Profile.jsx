import React,{useState} from 'react'
import {useAuth} from '../hooks/useAuth'
const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { getCurrentUser } = useAuth();
    const getUserDetails = async () => {

   try {

      const response = await getCurrentUser();

      setUserDetails(response.user);

   } catch(err){

      console.error(err);

   }
}

return (
   <main>

      {userDetails && (
         <>
            <img
               src={userDetails.Profile_Image}
               alt=""
            />

            <h1>{userDetails.username}</h1>

            <p>{userDetails.bio}</p>
         </>
      )}

      <button onClick={getUserDetails}>
         userDetails
      </button>

   </main>
)
}

export default Profile