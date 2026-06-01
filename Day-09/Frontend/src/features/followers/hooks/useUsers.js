import { useContext } from "react";
import { UsersProfileContext } from "../userProfiles.context.jsx";

export const useUsers = () => {
    const context = useContext(UsersProfileContext);

    if (!context) {
        throw new Error("useUsers must be used within UsersProfileProvider");
    }

    return context;
}