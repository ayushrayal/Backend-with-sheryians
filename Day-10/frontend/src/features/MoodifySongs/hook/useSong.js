import {SongContext} from '../song.context.jsx'
import { useContext } from "react";

export const useSong = ()=>{
    const {song,loading,getSong} = useContext(SongContext);
    return {song,loading,getSong}
}