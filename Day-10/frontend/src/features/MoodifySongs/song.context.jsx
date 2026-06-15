import { createContext, useState } from "react";
import { handleGetSong } from "./services/song.service";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSong = async (emotion) => {
        try {
            setLoading(true);

            const response = await handleGetSong(emotion);

            setSong(response.data);

            return response.data;
        } finally {
            setLoading(false);
        }
    };

    return (
        <SongContext.Provider
            value={{
                song,
                loading,
                getSong
            }}
        >
            {children}
        </SongContext.Provider>
    );
};