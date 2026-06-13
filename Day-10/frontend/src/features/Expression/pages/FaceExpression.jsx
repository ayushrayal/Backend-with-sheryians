import React, { useEffect, useRef, useState } from "react";
import { initialize } from "../utils/utils";
import LogoutButton from "../components/LogoutButton";
import '../style/faceExpression.scss'
const FaceExpression = () => {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const [emotion, setEmotion] = useState("Detecting...");
    useEffect(() => {
        initialize({
            videoRef,
            faceLandmarkerRef,
            setEmotion,
        });
    }, []);
    return (
        <main >
            <LogoutButton />
            <div className="face-expression-container">
                <h2 >Face Expression Detection</h2>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
            />
            <h1>{emotion}</h1>
            <button  onClick={() => initialize({ videoRef, faceLandmarkerRef, setEmotion })}>
                Reset
            </button>
        </div>
        </main>
    );
};

export default FaceExpression;