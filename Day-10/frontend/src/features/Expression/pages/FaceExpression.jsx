import { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import '../style/faceExpression.scss'
import Video from "../components/Video";
import RightSideBox from "../../MoodifySongs/pages/RightSideBox";
import LeftSideBox from "../../MoodifySongs/pages/LeftSideBox";

const FaceExpression = () => {
 const [emotion, setEmotion] = useState("Detecting...");
 console.log(emotion);
 
    return (
        <main >
            <div className="navbar"><LogoutButton /></div>
            <div className="content-container">
               <LeftSideBox/>
                <Video emotion={emotion} setEmotion={setEmotion}/>
                <RightSideBox emotion={emotion} />
            </div>

        </main>
    );
};

export default FaceExpression;