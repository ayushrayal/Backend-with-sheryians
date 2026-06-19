import "../style/leftSideBox.scss";

const CpuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
);

const WaveformIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M3 10v4M6 6v12M9 10v4M12 4v16M15 8v8M18 10v4M21 6v12" />
    </svg>
);

const LeftSideBox = () => {
    return (
        <aside className="left-panel" aria-label="About Moodify">
            <div className="left-panel__brand">
                <div className="left-panel__logo" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                </div>
                <div className="left-panel__brand-text">
                    <span className="left-panel__app-name">Moodify</span>
                    <span className="left-panel__version">v2.0</span>
                </div>
            </div>

            {/* Live System Status Pill */}
            <div className="left-panel__status">
                <span className="status-dot"></span>
                <span className="status-text">AI Core Active</span>
            </div>

            <p className="left-panel__description">
                Experience real-time AI music recommendations powered by <strong>MediaPipe</strong> and <strong>Spotify</strong>. Look at your camera, scan your mood, and let the neural engine match your frequencies.
            </p>

            <div className="left-panel__specs">
                <div className="spec-item">
                    <div className="spec-icon">
                        <CpuIcon />
                    </div>
                    <div className="spec-info">
                        <span className="spec-label">Model</span>
                        <span className="spec-val">FaceLandmarker API</span>
                    </div>
                </div>
                <div className="spec-item">
                    <div className="spec-icon">
                        <WaveformIcon />
                    </div>
                    <div className="spec-info">
                        <span className="spec-label">Audio Engine</span>
                        <span className="spec-val">Spotify API v1</span>
                    </div>
                </div>
            </div>

            <div className="left-panel__credit">
                <div className="credit-label">DEVELOPER</div>
                <div className="credit-name">Ayush Rayal</div>
                <div className="credit-title">Creative Engineer</div>
            </div>
        </aside>
    );
};

export default LeftSideBox;