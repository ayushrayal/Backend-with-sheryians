import { useEffect, useState } from "react";
import { useSong } from "../hook/useSong";
import '../style/rightSideBox.scss'
const RightSideBox = ({ emotion }) => {
  const { getSong } = useSong();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songResponse = await getSong(emotion);
        console.log(songResponse);

        // Agar response me songs array hai
        setSongs(songResponse.songs);
      } catch (err) {
        console.log(err);
      }
    };

    if (emotion) {
      fetchSongs();
    }
  }, [emotion]);

  return (
    <div className="RightSideBox">
     <div className="heading">
       <h1>{emotion} Songs</h1>
     </div>

      <div className="songsContainer">
        {emotion && songs.map((song) => (
          <div className="song" key={song.id}>
            <img src={song.image} alt={song.name} />

            <div className="details">
              <div className="songName">{song.name}</div>
              <div className="artistName">{song.artist}</div>
              <div className="albumName">{song.album}</div>
            </div>

            <div className="playBtn">▶<a href={song.spotifyUrl}></a></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBox;