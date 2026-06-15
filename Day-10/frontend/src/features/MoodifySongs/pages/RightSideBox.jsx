import React, { useEffect } from "react";
import "../style/rightSideBox.scss";
import { useSong } from "../hook/useSong";
import '../style/rightSideBox.scss'

const RightSideBox = ({ emotion }) => {
    const { loading, song, getSong } = useSong();

    useEffect(() => {
    if (!emotion) return;

    const cleanEmotion = emotion
        .replace(/[^\w\s]/gi, "")
        .trim()
        .toLowerCase();

    getSong(cleanEmotion);
}, [emotion]);

    if (loading) {
        return (
            <div className="rightsidebox">
                <h1>Loading Songs...</h1>
            </div>
        );
    }
console.log(song);


    return (
        <div className="rightsidebox">
            <h1>Recommended Songs</h1>

            <div className="songcontainer">
                {song?.songs?.map((item) => (
                    <div className="song" key={item.id}>
                        <img
                            src={item.image}
                            alt={item.name}
                            width="100"
                        />
                        <h3>{item.name}</h3>
                       
                        <a
                            href={item.spotifyUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open in Spotify
                        </a>
                        {item.previewUrl && (
                            <audio
                                controls
                                src={item.previewUrl}
                            />
                        )} 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RightSideBox;