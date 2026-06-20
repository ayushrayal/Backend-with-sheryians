import React, { useEffect, useRef, useState } from "react";
import { initializeCamera } from "../utils/utils";

const Video = ({emotion,setEmotion}) => {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    useEffect(() => {
        initializeCamera({
            videoRef,
            faceLandmarkerRef,
            setEmotion,
        });
    }, []);
  return (
    <div className="face-expression-container">
                    <h2 >Face Expression Detection</h2>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                />
                <div className="mood">
                    <h1>{emotion}</h1>
                
                
                
                <button  onClick={() => initializeCamera({ videoRef, faceLandmarkerRef, setEmotion })}>
                    Detect Mood
                </button>
                </div>
            </div>
  )
}

export default Video