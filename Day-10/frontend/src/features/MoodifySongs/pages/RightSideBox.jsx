import { useEffect, useRef, useState, memo, useCallback } from "react";
import "../style/rightSideBox.scss";
import { useSong } from "../hook/useSong";

const MOOD_LABELS = {
    happy:     { label: "Happy",     emoji: "😊", color: "#00FFA3" },
    sad:       { label: "Sad",       emoji: "😢", color: "#06B6D4" },
    angry:     { label: "Angry",     emoji: "😠", color: "#FF4D8D" },
    surprised: { label: "Surprised", emoji: "😲", color: "#FFB800" },
    neutral:   { label: "Neutral",   emoji: "😐", color: "#B8B8C7" }
};

const formatDuration = (ms) => {
    if (!ms) return null;
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
};

const PlayIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="6,4 20,12 6,20" />
    </svg>
);

const PauseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
    </svg>
);

const SpotifyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
);

const SkeletonCard = () => (
    <div className="song-card song-card--skeleton" aria-hidden="true">
        <div className="song-card__row">
            <div className="skeleton skeleton--img" />
            <div className="song-card__body">
                <div className="skeleton skeleton--title" />
                <div className="skeleton skeleton--artist" />
            </div>
            <div className="skeleton skeleton--tag" />
            <div className="skeleton skeleton--btn" />
        </div>
    </div>
);

const SongCard = memo(({ item, mood, index, viewport }) => {
    const moodMeta = MOOD_LABELS[mood] || MOOD_LABELS.neutral;
    const duration = formatDuration(item.durationMs);

    const [expanded, setExpanded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const isDesktop = viewport === "desktop";

    const togglePlay = useCallback((e) => {
        e.stopPropagation();
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            // Pause all other audio elements on the page
            document.querySelectorAll("audio").forEach((audio) => {
                if (audio !== audioRef.current) {
                    audio.pause();
                }
            });
            audioRef.current.play().catch(() => {});
            setPlaying(true);
        }
    }, [playing]);

    // Handle audio lifecycle updates
    const onAudioPlay = () => setPlaying(true);
    const onAudioPause = () => setPlaying(false);
    const onAudioEnded = () => setPlaying(false);

    const handleCardClick = () => {
        if (!isDesktop) {
            setExpanded((prev) => !prev);
        }
    };

    return (
        <article
            className={`song-card ${expanded ? "expanded" : ""} ${!isDesktop ? "clickable" : ""}`}
            style={{ animationDelay: `${index * 40}ms` }}
            onClick={handleCardClick}
            aria-label={`${item.name} by ${item.artist}`}
        >
            <div className="song-card__row">
                <img
                    className="song-card__art"
                    src={item.image || "https://via.placeholder.com/56x56/14141F/B8B8C7?text=♫"}
                    alt={`${item.album} album art`}
                    loading="lazy"
                    width={48}
                    height={48}
                />

                <div className="song-card__body">
                    <p className="song-card__name" title={item.name}>{item.name}</p>
                    <div className="song-card__details-row">
                        <span className="song-card__artist">{item.artist}</span>
                        {duration && <span className="song-card__dot-divider">•</span>}
                        {duration && <span className="song-card__duration">{duration}</span>}
                    </div>

                    {/* Desktop: Gracefully notify if preview is missing */}
                    {isDesktop && !item.previewUrl && (
                        <div className="song-card__no-preview" onClick={(e) => e.stopPropagation()}>
                            <span>No preview available.</span>
                            <a
                                href={item.spotifyUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="spotify-inline-link"
                            >
                                Play on Spotify
                            </a>
                        </div>
                    )}
                </div>

                <span
                    className="song-card__mood-tag"
                    style={{
                        backgroundColor: moodMeta.color + "12",
                        color: moodMeta.color,
                        borderColor: moodMeta.color + "30"
                    }}
                    aria-label={`Mood: ${moodMeta.label}`}
                >
                    {moodMeta.emoji} {moodMeta.label}
                </span>

                <div className="song-card__actions" onClick={(e) => e.stopPropagation()}>
                    {/* Desktop play button (only if previewUrl exists) */}
                    {isDesktop && item.previewUrl && (
                        <>
                            <audio
                                ref={audioRef}
                                src={item.previewUrl}
                                onPlay={onAudioPlay}
                                onPause={onAudioPause}
                                onEnded={onAudioEnded}
                                preload="none"
                            />
                            <button
                                className={`song-card__play-btn ${playing ? "playing" : ""}`}
                                onClick={togglePlay}
                                aria-label={playing ? "Pause preview" : "Play preview"}
                                title={playing ? "Pause" : "Play preview"}
                            >
                                {playing ? <PauseIcon /> : <PlayIcon />}
                            </button>
                        </>
                    )}

                    {/* Spotify Icon Button */}
                    <a
                        href={item.spotifyUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="song-card__spotify-btn"
                        aria-label={`Open ${item.name} on Spotify`}
                        title="Open on Spotify"
                    >
                        <SpotifyIcon />
                        {isDesktop && <span className="spotify-btn-text">Open in Spotify</span>}
                    </a>
                </div>
            </div>

            {/* Mobile & Tablet Spotify Embed Player (Expandable) */}
            {!isDesktop && expanded && (
                <div className="song-card__embed" onClick={(e) => e.stopPropagation()}>
                    <iframe
                        title={`Spotify embed for ${item.id}`}
                        src={`https://open.spotify.com/embed/track/${item.id}?utm_source=generator`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </div>
            )}
        </article>
    );
});

SongCard.displayName = "SongCard";

const VALID_MOODS = new Set(["happy", "sad", "angry", "surprised", "neutral"]);

const RightSideBox = ({ emotion }) => {
    const { loading, song, error, getSong } = useSong();
    const lastFetchedEmotion = useRef(null);
    const [viewport, setViewport] = useState("desktop");

    // Detect Viewport Type
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setViewport("mobile");
            } else if (width <= 1024) {
                setViewport("tablet");
            } else {
                setViewport("desktop");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch recommendations on emotion changes
    useEffect(() => {
        if (!emotion) return;
        if (!VALID_MOODS.has(emotion)) return;
        if (emotion === lastFetchedEmotion.current) return;

        lastFetchedEmotion.current = emotion;
        getSong(emotion);
    }, [emotion, getSong]);

    const moodMeta = emotion ? MOOD_LABELS[emotion] : null;

    return (
        <section className="right-panel" aria-label="Song recommendations">
            {/* Header */}
            <div className="right-panel__header">
                <div className="right-panel__header-info">
                    <h2 className="right-panel__title">
                        {moodMeta ? (
                            <>
                                <span aria-hidden="true">{moodMeta.emoji}</span>{" "}
                                {moodMeta.label} Picks
                            </>
                        ) : (
                            "Frequencies"
                        )}
                    </h2>
                    <span className="right-panel__subtitle">Personalized Feed</span>
                </div>
                {song && !loading && (
                    <span className="right-panel__count">{song.totalSongs} Tracks</span>
                )}
            </div>

            {/* Scrollable list */}
            <div className="right-panel__list" aria-live="polite" aria-atomic="false">
                {loading && (
                    <>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </>
                )}

                {!loading && error && (
                    <div className="right-panel__state right-panel__state--error" role="alert">
                        <span className="state-icon" aria-hidden="true">⚠️</span>
                        <p>{error}</p>
                        <button
                            className="state-retry-btn"
                            onClick={() => getSong(emotion)}
                        >
                            Refetch Playlist
                        </button>
                    </div>
                )}

                {!loading && !error && !emotion && (
                    <div className="right-panel__state right-panel__state--empty">
                        <span className="state-icon" aria-hidden="true">🔮</span>
                        <p>Analyze your mood to decode recommendations.</p>
                    </div>
                )}

                {!loading && !error && song?.songs?.map((item, index) => (
                    <SongCard
                        key={item.id}
                        item={item}
                        mood={emotion}
                        index={index}
                        viewport={viewport}
                    />
                ))}
            </div>
        </section>
    );
};

export default RightSideBox;