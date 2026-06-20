import {
    FaceLandmarker,
    FilesetResolver,
} from "@mediapipe/tasks-vision";

const getBlendshapeScore = (blendshapes, name) => {
    return (
        blendshapes.find((item) => item.categoryName === name)?.score || 0
    );
};

const detectEmotion = (blendshapes) => {
    const smileLeft = getBlendshapeScore(
        blendshapes,
        "mouthSmileLeft"
    );

    const smileRight = getBlendshapeScore(
        blendshapes,
        "mouthSmileRight"
    );
    const mouthFrownLeft = getBlendshapeScore(
        blendshapes,
        "mouthFrownLeft"
    );

    const mouthFrownRight = getBlendshapeScore(
        blendshapes,
        "mouthFrownRight"
    );

    const jawOpen = getBlendshapeScore(
        blendshapes,
        "jawOpen"
    );

    const browInnerUp = getBlendshapeScore(
        blendshapes,
        "browInnerUp"
    );

    const browDownLeft = getBlendshapeScore(
        blendshapes,
        "browDownLeft"
    );

    const browDownRight = getBlendshapeScore(
        blendshapes,
        "browDownRight"
    );

    if (smileLeft > 0.6 && smileRight > 0.6) {
        return "😊 Happy";
    }

    if (jawOpen > 0.2 && browInnerUp > 0.1) {
        return "😲 Surprised";
    }

    if (
        mouthFrownLeft > 0.3 &&
        mouthFrownRight > 0.3 &&
        browInnerUp > 0.2
    ) {
        return "😢 Sad";
    }
    if (browDownLeft > 0.3 && browDownRight > 0.3) {
        return "😠 Angry";
    }

    return "😐 Neutral";
};


export const initializeCamera = async ({ videoRef, faceLandmarkerRef, setEmotion }) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
    });

    videoRef.current.srcObject = stream;

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const faceLandmarker =
        await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1,
            }
        );

    faceLandmarkerRef.current = faceLandmarker;

    const detect = () => {
        if (
            videoRef.current &&
            videoRef.current.readyState >= 2
        ) {
            const results =
                faceLandmarkerRef.current.detectForVideo(
                    videoRef.current,
                    performance.now()
                );

            if (
                results.faceBlendshapes &&
                results.faceBlendshapes.length > 0
            ) {
                const blendshapes =
                    results.faceBlendshapes[0].categories;

                const currentEmotion =
                    detectEmotion(blendshapes);

                setEmotion(currentEmotion);
            }
        }
    }

    detect();
};