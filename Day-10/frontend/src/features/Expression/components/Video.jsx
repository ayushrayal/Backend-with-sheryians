import { useCallback, useEffect, useRef, useState } from "react";
import { initializeCamera } from "../utils/utils";

const VALID_MOODS = new Set(["happy", "sad", "angry", "surprised", "neutral"]);

const ScanIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M4 12h16" />
    </svg>
);

const Video = ({ onMoodDetected }) => {
    const videoRef = useRef(null);
    const detectorRef = useRef(null);

    const [cameraReady, setCameraReady] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [detecting, setDetecting] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [detectedLabel, setDetectedLabel] = useState(null);
    const [confidence, setConfidence] = useState(null);

    // Initialize camera & MediaPipe
    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            setInitializing(true);
            setCameraError(null);
            try {
                const detector = await initializeCamera(videoRef);
                if (cancelled) return;
                detectorRef.current = detector;
                setCameraReady(true);
            } catch (err) {
                if (cancelled) return;
                if (err.name === "NotAllowedError") {
                    setCameraError("Camera access denied. Please allow camera permissions.");
                } else if (err.name === "NotFoundError") {
                    setCameraError("No camera found. Connect a device & refresh.");
                } else {
                    setCameraError("Failed to initialize camera. Please try again.");
                }
            } finally {
                if (!cancelled) setInitializing(false);
            }
        };

        init();

        return () => {
            cancelled = true;
            const tracks = videoRef.current?.srcObject?.getTracks?.();
            tracks?.forEach((t) => t.stop());
        };
    }, []);

    // Handle mood detection trigger
    const handleDetect = useCallback(async () => {
        if (!cameraReady || detecting || !detectorRef.current) return;

        setDetecting(true);
        setDetectedLabel(null);
        setConfidence(null);

        try {
            const result = await detectorRef.current.detect();

            if (!result || !VALID_MOODS.has(result.emotion)) {
                setCameraError("Face not detected. Face the camera directly.");
                setDetecting(false);
                return;
            }

            setDetectedLabel(result.label);
            setConfidence(result.confidence);
            setCameraError(null);
            onMoodDetected(result.emotion);
        } catch {
            setCameraError("Detection failed. Please try again.");
        } finally {
            setDetecting(false);
        }
    }, [cameraReady, detecting, onMoodDetected]);

    const emoji = detectedLabel ? detectedLabel.split(" ")[0] : "";
    const name = detectedLabel ? detectedLabel.split(" ")[1] : "";

    return (
        <section className="center-panel" aria-label="Mood detection">
            {/* Header */}
            <div className="center-panel__header">
                <div className="center-panel__header-title">
                    <h2 className="center-panel__title">Neural Scanner</h2>
                    <span className="center-panel__subtitle">AI Emotion Engine</span>
                </div>
                <div className={`center-panel__live ${!cameraReady || initializing ? "hidden" : ""}`} aria-label="Camera live">
                    <span className="center-panel__live-dot" aria-hidden="true" />
                    Feed Live
                </div>
            </div>

            {/* 1. Camera (Video Container) */}
            <div className={`center-panel__video-container ${detecting ? "scanning" : ""}`}>
                <div className="scanner-corner tl" />
                <div className="scanner-corner tr" />
                <div className="scanner-corner bl" />
                <div className="scanner-corner br" />

                {detecting && <div className="scanner-laser" />}

                <div className="center-panel__video-wrapper">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        aria-label="Webcam feed"
                    />

                    {initializing && (
                        <div className="center-panel__init-overlay" aria-live="polite">
                            <span className="init-spinner" aria-hidden="true" />
                            <span>Booting MediaPipe…</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Detected Mood Card */}
            <div className="center-panel__result-section">
                {detectedLabel ? (
                    <div className="emotion-card">
                        <span className="emotion-card__emoji" aria-hidden="true">{emoji}</span>
                        <div className="emotion-card__details">
                            <span className="emotion-card__label">Detected State</span>
                            <h3 className="emotion-card__name">{name}</h3>
                        </div>
                        <div className="emotion-card__badge">
                            {confidence}% Match
                        </div>
                    </div>
                ) : (
                    <div className="emotion-card emotion-card--empty">
                        <span className="empty-icon">⚡</span>
                        <p>Initiate scanning to analyze your emotional state.</p>
                    </div>
                )}
            </div>

            {/* 3. Confidence Progress */}
            {detectedLabel && (
                <div className="confidence-progress">
                    <div className="confidence-progress__label-row">
                        <span>Confidence Level</span>
                        <span>{confidence}%</span>
                    </div>
                    <div className="confidence-progress__track">
                        <div
                            className="confidence-progress__fill"
                            style={{ width: `${confidence}%` }}
                        />
                    </div>
                </div>
            )}

            {/* 4. Detect Mood Button */}
            <button
                id="detect-mood-btn"
                className={`center-panel__detect-btn ${detecting ? "loading" : ""}`}
                onClick={handleDetect}
                disabled={!cameraReady || detecting}
                aria-busy={detecting}
            >
                {detecting ? (
                    <>
                        <span className="detect-spinner" aria-hidden="true" />
                        Scanning Frequencies…
                    </>
                ) : (
                    <>
                        <ScanIcon />
                        Detect My Mood
                    </>
                )}
            </button>

            {/* Error Message */}
            {cameraError && (
                <p className="center-panel__error" role="alert">
                    <span className="error-icon">⚠️</span> {cameraError}
                </p>
            )}
        </section>
    );
};

export default Video;