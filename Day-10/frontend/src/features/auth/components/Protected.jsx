import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Protected = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <main>Loading...</main>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;