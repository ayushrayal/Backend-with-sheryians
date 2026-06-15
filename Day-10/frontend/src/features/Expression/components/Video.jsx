import React, { useEffect, useRef, useState } from "react";
import { initialize } from "../utils/utils";

const Video = ({emotion,setEmotion}) => {
    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    useEffect(() => {
        initialize({
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
                <h1>{emotion}</h1>
                
                
                <button  onClick={() => initialize({ videoRef, faceLandmarkerRef, setEmotion })}>
                    Reset
                </button>
            </div>
  )
}

export default Video