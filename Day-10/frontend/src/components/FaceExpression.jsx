import React, { useEffect, useRef, useState } from "react";
import { initialize } from "../utils/utils";
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
        <div
            style={{
                textAlign: "center",
                padding: "20px",
            }}>
            <h2>Face Expression Detection</h2>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                width="640"
                height="480"
                style={{
                    borderRadius: "12px",
                    border: "2px solid #ccc",
                }}
            />
            <h1>{emotion}</h1>
            <button onClick={() => initialize({ videoRef, faceLandmarkerRef, setEmotion })} style={{
                padding: "10px 20px",
                fontSize: "16px", borderRadius: "8px",
            }}>
                Reset
            </button>
        </div>
    );
};

export default FaceExpression;