const axios = require("axios");
const { getSpotifyToken } = require("../utils/spotify.utils");

const getSongController = async (req, res) => {
    try {
        const { mood } = req.query;

        if (!mood) {
            return res.status(400).json({ message: "Mood is required" });
        }

        const token = await getSpotifyToken();

        const moodMap = {
            happy: "Hindi romantic songs",
            sad: "Arijit Singh",
            angry: "motivational hindi songs",
            neutral: "latest hindi songs",
            surprised: "Yo Yo Honey Singh"
        };
        const cleanMood = mood?.replace(/[^\w\s]/g, "").trim().toLowerCase();

        const searchQuery = moodMap[cleanMood?.toLowerCase()] || "top%20hits";
        // console.log("searchQuery", searchQuery);

        const spotifyResponse = await axios.get(
            "https://api.spotify.com/v1/search",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchQuery,
                    type: "track",
                    limit: 10, 
                    market: "IN" 
                }
            }
        );

        const songs = spotifyResponse.data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(", "),
            album: track.album.name,
            image: track.album.images?.[0]?.url,
            spotifyUrl: track.external_urls.spotify,
            previewUrl: track.preview_url
        }));

        return res.status(200).json({
            mood,
            totalSongs: songs.length,
            songs
        });

    } catch (error) {
        console.error("FULL ERROR:", error.response?.data);
        return res.status(500).json({
            message: "Failed to fetch songs",
            error: error.response?.data || error.message
        });
    }
};

module.exports = { getSongController };   